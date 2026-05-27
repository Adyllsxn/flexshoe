import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IProductService } from 'src/domain/abstractions/services/iproduct.service';
import {
  IProduct,
  IProductWithBrand,
} from 'src/domain/abstractions/types/product.type';
import { CreateProductDto, Gender } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationHelper } from 'src/domain/shared/helper/pagination.helper';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: { deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: { deletedAt: null },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      gender: product.gender as Gender,
    })) as IProductWithBrand[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async findOne(id: string): Promise<IProductWithBrand> {
    await this.incrementViews(id);

    const product = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    return {
      ...product,
      gender: product.gender,
    };
  }

  async findByName(
    name: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: {
          name: { contains: name, mode: 'insensitive' },
          deletedAt: null,
        },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      gender: product.gender as Gender,
    })) as IProductWithBrand[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async findByBrand(
    brandId: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IProductWithBrand[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const brand = await this.prismaService.brand.findFirst({
      where: { id: brandId },
    });

    if (!brand) {
      throw new NotFoundException(`Marca com ID "${brandId}" não encontrada`);
    }

    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        where: { brandId, deletedAt: null },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      }),
      this.prismaService.product.count({
        where: { brandId, deletedAt: null },
      }),
    ]);

    const formattedData = data.map((product) => ({
      ...product,
      gender: product.gender as Gender,
    })) as IProductWithBrand[];

    return PaginationHelper.paginate(formattedData, total, page, limit);
  }

  async create(
    createProductDto: CreateProductDto,
    userId: string,
  ): Promise<IProduct> {
    const existingBySlug = await this.prismaService.product.findFirst({
      where: { slug: createProductDto.slug },
    });

    if (existingBySlug) {
      throw new ConflictException(
        `Produto com slug "${createProductDto.slug}" já existe`,
      );
    }

    const brand = await this.prismaService.brand.findFirst({
      where: { id: createProductDto.brandId },
    });

    if (!brand) {
      throw new NotFoundException(
        `Marca com ID "${createProductDto.brandId}" não encontrada`,
      );
    }

    const product = await this.prismaService.product.create({
      data: {
        name: createProductDto.name,
        slug: createProductDto.slug,
        description: createProductDto.description,
        price: createProductDto.price,
        brandId: createProductDto.brandId,
        gender: createProductDto.gender,
        mainImage: createProductDto.mainImage,
        images: createProductDto.images ?? [],
        active: createProductDto.active ?? true,
        featured: createProductDto.featured ?? false,
        stock: createProductDto.stock ?? 0,
        createdById: userId,
        updatedById: userId,
      },
    });

    return {
      ...product,
      gender: product.gender,
    };
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
    userId: string,
  ): Promise<IProduct> {
    await this.findOne(id);

    if (updateProductDto.slug) {
      const slugExists = await this.prismaService.product.findFirst({
        where: { slug: updateProductDto.slug, id: { not: id } },
      });

      if (slugExists) {
        throw new ConflictException(
          `Produto com slug "${updateProductDto.slug}" já existe`,
        );
      }
    }

    if (updateProductDto.brandId) {
      const brand = await this.prismaService.brand.findFirst({
        where: { id: updateProductDto.brandId },
      });

      if (!brand) {
        throw new NotFoundException(
          `Marca com ID "${updateProductDto.brandId}" não encontrada`,
        );
      }
    }

    const product = await this.prismaService.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        slug: updateProductDto.slug,
        description: updateProductDto.description,
        price: updateProductDto.price,
        brandId: updateProductDto.brandId,
        gender: updateProductDto.gender,
        mainImage: updateProductDto.mainImage,
        images: updateProductDto.images,
        active: updateProductDto.active,
        featured: updateProductDto.featured,
        stock: updateProductDto.stock,
        updatedById: userId,
      },
    });

    return {
      ...product,
      gender: product.gender,
    };
  }

  async remove(
    id: string,
    userId: string,
  ): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt !== null) {
      throw new BadRequestException(
        `Produto "${product.name}" já está deletado`,
      );
    }

    const deletedProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        updatedById: userId,
      },
    });

    return {
      message: `Produto "${product.name}" foi deletado com sucesso`,
      product: {
        ...deletedProduct,
        gender: deletedProduct.gender,
      },
    };
  }

  async restore(
    id: string,
    userId: string,
  ): Promise<{ message: string; product: IProduct }> {
    const product = await this.prismaService.product.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (product.deletedAt === null) {
      throw new BadRequestException(
        `Produto "${product.name}" não está deletado`,
      );
    }

    const restoredProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        deletedAt: null,
        updatedById: userId,
      },
    });

    return {
      message: `Produto "${product.name}" foi restaurado com sucesso`,
      product: {
        ...restoredProduct,
        gender: restoredProduct.gender,
      },
    };
  }

  async updateStock(
    id: string,
    quantity: number,
    userId: string,
  ): Promise<IProduct> {
    const product = await this.prismaService.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!product) {
      throw new NotFoundException(`Produto com ID "${id}" não encontrado`);
    }

    if (quantity < 0) {
      throw new BadRequestException('Quantidade não pode ser negativa');
    }

    const updatedProduct = await this.prismaService.product.update({
      where: { id },
      data: {
        stock: quantity,
        updatedById: userId,
      },
    });

    return {
      ...updatedProduct,
      gender: updatedProduct.gender,
    };
  }

  async incrementViews(id: string): Promise<void> {
    await this.prismaService.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }
}
