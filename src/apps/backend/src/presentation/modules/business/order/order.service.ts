import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { IOrderService } from 'src/domain/abstractions/services/iorder.service';
import {
  IOrder,
  IOrderWithItems,
  OrderStatus,
} from 'src/domain/abstractions/types/order.type';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationHelper } from 'src/domain/shared/helper/pagination.helper';
import { PaginationDto } from 'src/domain/shared/pagination/pagination.dto';
import { CartService } from '../cart/cart.service';

interface CartItemType {
  inventoryId: string;
  productName: string;
  brandName: string;
  size: number;
  color: string;
  quantity: number;
  price: number;
  subtotal: number;
}

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cartService: CartService,
  ) {}

  private generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `FX-${year}${month}${day}-${random}`;
  }

  private sendWhatsAppMessage(
    phone: string,
    orderNumber: string,
    items: CartItemType[],
    total: number,
  ): string {
    const itemsList = items
      .map(
        (item) =>
          `- ${item.productName} (Tamanho: ${item.size}, Cor: ${item.color}) x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} KZ`,
      )
      .join('\n');

    const message =
      `🛍️ *NOVO PEDIDO - ${orderNumber}* 🛍️\n\n` +
      `📋 *ITENS:*\n${itemsList}\n\n` +
      `💰 *TOTAL:* ${total.toFixed(2)} KZ\n\n` +
      `✅ Pedido recebido! Em breve entraremos em contato.\n\n` +
      `*FlexShoe - Tênis de Qualidade*`;

    console.log(`📧 WhatsApp message to ${phone}:`);
    console.log(message);

    return message;
  }

  async create(createOrderDto: CreateOrderDto): Promise<IOrderWithItems> {
    const { clientName, clientPhone, clientAddress, cartSessionId } =
      createOrderDto;

    const cartSummary = await this.cartService.getCartSummary(cartSessionId);

    if (cartSummary.items.length === 0) {
      throw new BadRequestException('Carrinho vazio');
    }

    const orderNumber = this.generateOrderNumber();

    const whatsappMessage = this.sendWhatsAppMessage(
      clientPhone,
      orderNumber,
      cartSummary.items,
      cartSummary.total,
    );

    const order = await this.prismaService.order.create({
      data: {
        orderNumber,
        status: 'pending',
        clientName,
        clientPhone,
        clientAddress: clientAddress || null,
        subtotal: cartSummary.subtotal,
        total: cartSummary.total,
        whatsappMessage,
        whatsappSentAt: new Date(),
      },
    });

    for (const item of cartSummary.items) {
      await this.prismaService.orderItem.create({
        data: {
          orderId: order.id,
          inventoryId: item.inventoryId,
          productId: item.inventoryId,
          productName: item.productName,
          brandName: item.brandName,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
          total: item.subtotal,
        },
      });

      await this.prismaService.inventoryItem.update({
        where: { id: item.inventoryId },
        data: {
          stock: { decrement: item.quantity },
          reserved: { decrement: item.quantity },
        },
      });
    }

    await this.cartService.clearCart(cartSessionId);

    return this.findOne(order.id);
  }

  async findAll(paginationDto: PaginationDto): Promise<{
    data: IOrderWithItems[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
        },
      }),
      this.prismaService.order.count(),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }

  async findOne(id: string): Promise<IOrderWithItems> {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Pedido com ID "${id}" não encontrado`);
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    await this.findOne(id);

    const order = await this.prismaService.order.update({
      where: { id },
      data: {
        clientName: updateOrderDto.clientName,
        clientPhone: updateOrderDto.clientPhone,
        clientAddress: updateOrderDto.clientAddress,
      },
    });

    return order;
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
    userId: string,
  ): Promise<IOrder> {
    await this.findOne(id);

    const order = await this.prismaService.order.update({
      where: { id },
      data: {
        status,
        updatedById: userId,
      },
    });

    return order;
  }

  async remove(id: string): Promise<{ message: string }> {
    const order = await this.findOne(id);

    await this.prismaService.order.delete({
      where: { id },
    });

    return {
      message: `Pedido ${order.orderNumber} foi deletado com sucesso`,
    };
  }

  async getByPhone(
    phone: string,
    paginationDto: PaginationDto,
  ): Promise<{
    data: IOrderWithItems[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = PaginationHelper.skip(page, limit);

    const [data, total] = await Promise.all([
      this.prismaService.order.findMany({
        where: { clientPhone: { contains: phone } },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true,
        },
      }),
      this.prismaService.order.count({
        where: { clientPhone: { contains: phone } },
      }),
    ]);

    return PaginationHelper.paginate(data, total, page, limit);
  }
}
