import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IInventoryService } from 'src/domain/abstractions/services/iinventory.service';
import {
  IInventoryItem,
  IInventoryItemWithProduct,
} from 'src/domain/abstractions/types/inventory.type';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PaginationHelper } from 'src/domain/shared/helper/pagination.helper';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

@Injectable()
export class InventoryService implements IInventoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IInventoryItemWithProduct[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.inventoryItem.findMany({
        where: { active: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          product: {
            include: {
              brand: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.inventoryItem.count({
        where: { active: true },
      }),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }

  async findByProduct(productId: string): Promise<IInventoryItem[]> {
    const product = await this.prismaService.product.findFirst({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com ID "${productId}" não encontrado`,
      );
    }

    return await this.prismaService.inventoryItem.findMany({
      where: { productId, active: true },
      orderBy: { size: 'asc' },
    });
  }

  async findOne(id: string): Promise<IInventoryItemWithProduct> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id },
      include: {
        product: {
          include: {
            brand: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    return item;
  }

  async create(
    createInventoryDto: CreateInventoryDto,
  ): Promise<IInventoryItem> {
    const product = await this.prismaService.product.findFirst({
      where: { id: createInventoryDto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com ID "${createInventoryDto.productId}" não encontrado`,
      );
    }

    // Verificar se a soma dos inventários não ultrapassa o stock do produto
    const existingItems = await this.prismaService.inventoryItem.findMany({
      where: { productId: createInventoryDto.productId, active: true },
    });

    const currentTotalStock = existingItems.reduce(
      (sum, item) => sum + item.stock,
      0,
    );
    const newStock = createInventoryDto.stock ?? 0;
    const newTotalStock = currentTotalStock + newStock;

    if (newTotalStock > product.stock) {
      throw new BadRequestException(
        `Estoque total do produto é ${product.stock}. Atualmente usado: ${currentTotalStock}. Tentando adicionar: ${newStock}. Limite disponível: ${product.stock - currentTotalStock}`,
      );
    }

    const existingSku = await this.prismaService.inventoryItem.findFirst({
      where: { sku: createInventoryDto.sku },
    });

    if (existingSku) {
      throw new ConflictException(`SKU "${createInventoryDto.sku}" já existe`);
    }

    const existingCombination =
      await this.prismaService.inventoryItem.findFirst({
        where: {
          productId: createInventoryDto.productId,
          size: createInventoryDto.size,
          color: createInventoryDto.color,
        },
      });

    if (existingCombination) {
      throw new ConflictException(
        `Combinação produto ${product.name} - tamanho ${createInventoryDto.size} - cor ${createInventoryDto.color} já existe`,
      );
    }

    const item = await this.prismaService.inventoryItem.create({
      data: {
        productId: createInventoryDto.productId,
        size: createInventoryDto.size,
        color: createInventoryDto.color,
        sku: createInventoryDto.sku,
        stock: createInventoryDto.stock ?? 0,
        reserved: 0,
        active: createInventoryDto.active ?? true,
      },
    });

    return item;
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<IInventoryItem> {
    const existingItem = await this.findOne(id);
    const product = await this.prismaService.product.findFirst({
      where: { id: existingItem.productId },
    });

    if (!product) {
      throw new NotFoundException(`Produto não encontrado`);
    }

    // Se estiver atualizando o stock, verificar limite
    if (updateInventoryDto.stock !== undefined) {
      const otherItems = await this.prismaService.inventoryItem.findMany({
        where: {
          productId: existingItem.productId,
          active: true,
          id: { not: id },
        },
      });

      const otherItemsTotal = otherItems.reduce(
        (sum, item) => sum + item.stock,
        0,
      );
      const newTotalStock = otherItemsTotal + updateInventoryDto.stock;

      if (newTotalStock > product.stock) {
        throw new BadRequestException(
          `Estoque total do produto é ${product.stock}. Outros itens somam: ${otherItemsTotal}. Tentando definir este item como: ${updateInventoryDto.stock}. Limite disponível: ${product.stock - otherItemsTotal}`,
        );
      }
    }

    if (updateInventoryDto.sku) {
      const existingSku = await this.prismaService.inventoryItem.findFirst({
        where: { sku: updateInventoryDto.sku, id: { not: id } },
      });

      if (existingSku) {
        throw new ConflictException(
          `SKU "${updateInventoryDto.sku}" já existe`,
        );
      }
    }

    const item = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        size: updateInventoryDto.size,
        color: updateInventoryDto.color,
        sku: updateInventoryDto.sku,
        active: updateInventoryDto.active,
      },
    });

    return item;
  }

  async remove(id: string): Promise<{ message: string; item: IInventoryItem }> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    const deletedItem = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        active: false,
      },
    });

    return {
      message: `Item ${item.sku} foi desativado com sucesso`,
      item: deletedItem,
    };
  }

  async restore(
    id: string,
  ): Promise<{ message: string; item: IInventoryItem }> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    if (item.active) {
      throw new BadRequestException(`Item ${item.sku} já está ativo`);
    }

    // Verificar se a reativação não ultrapassa o stock do produto
    const product = await this.prismaService.product.findFirst({
      where: { id: item.productId },
    });

    if (product) {
      const otherItems = await this.prismaService.inventoryItem.findMany({
        where: { productId: item.productId, active: true, id: { not: id } },
      });

      const otherItemsTotal = otherItems.reduce((sum, i) => sum + i.stock, 0);
      const newTotalStock = otherItemsTotal + item.stock;

      if (newTotalStock > product.stock) {
        throw new BadRequestException(
          `Não é possível reativar. Estoque total do produto é ${product.stock}. Outros itens somam: ${otherItemsTotal}. Este item tem ${item.stock}. Limite disponível: ${product.stock - otherItemsTotal}`,
        );
      }
    }

    const restoredItem = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        active: true,
      },
    });

    return {
      message: `Item ${item.sku} foi reativado com sucesso`,
      item: restoredItem,
    };
  }

  async updateStock(id: string, quantity: number): Promise<IInventoryItem> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id, active: true },
      include: { product: true },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    if (quantity < 0) {
      throw new BadRequestException('Quantidade não pode ser negativa');
    }

    // Verificar se o novo total não ultrapassa o produto
    const otherItems = await this.prismaService.inventoryItem.findMany({
      where: { productId: item.productId, active: true, id: { not: id } },
    });

    const otherItemsTotal = otherItems.reduce((sum, i) => sum + i.stock, 0);
    const newTotalStock = otherItemsTotal + quantity;

    if (newTotalStock > item.product.stock) {
      throw new BadRequestException(
        `Estoque total do produto é ${item.product.stock}. Outros itens somam: ${otherItemsTotal}. Este item teria ${quantity}. Limite disponível: ${item.product.stock - otherItemsTotal}`,
      );
    }

    const updatedItem = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        stock: quantity,
      },
    });

    return updatedItem;
  }

  async reserveStock(id: string, quantity: number): Promise<IInventoryItem> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id, active: true },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    const available = item.stock - item.reserved;

    if (available < quantity) {
      throw new BadRequestException(
        `Estoque insuficiente. Disponível: ${available}`,
      );
    }

    const updatedItem = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        reserved: { increment: quantity },
      },
    });

    return updatedItem;
  }

  async releaseStock(id: string, quantity: number): Promise<IInventoryItem> {
    const item = await this.prismaService.inventoryItem.findFirst({
      where: { id, active: true },
    });

    if (!item) {
      throw new NotFoundException(
        `Item de inventário com ID "${id}" não encontrado`,
      );
    }

    if (item.reserved < quantity) {
      throw new BadRequestException(`Não há reservas suficientes para liberar`);
    }

    const updatedItem = await this.prismaService.inventoryItem.update({
      where: { id },
      data: {
        reserved: { decrement: quantity },
      },
    });

    return updatedItem;
  }
}
