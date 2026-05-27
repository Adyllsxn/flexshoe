import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICartService } from 'src/domain/abstractions/services/icart.service';
import { ICartWithDetails, CartItemDto } from 'src/domain/abstractions/types/cart.type';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService implements ICartService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCart(sessionId: string): Promise<ICartWithDetails> {
    const cart = await this.prismaService.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            inventory: {
              include: {
                product: {
                  include: {
                    brand: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return {
        id: '',
        sessionId,
        expiresAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [],
      };
    }

    return cart as ICartWithDetails;
  }

  async addItem(sessionId: string, addToCartDto: AddToCartDto): Promise<ICartWithDetails> {
    const { inventoryId, quantity } = addToCartDto;

    const inventory = await this.prismaService.inventoryItem.findFirst({
      where: { id: inventoryId, active: true },
    });

    if (!inventory) {
      throw new NotFoundException('Produto não encontrado em estoque');
    }

    const available = inventory.stock - inventory.reserved;
    if (available < quantity) {
      throw new BadRequestException(`Estoque insuficiente. Disponível: ${available}`);
    }

    let cart = await this.prismaService.cart.findUnique({
      where: { sessionId },
    });

    if (!cart) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      cart = await this.prismaService.cart.create({
        data: {
          sessionId,
          expiresAt,
        },
      });
    }

    const existingItem = await this.prismaService.cartItem.findFirst({
      where: {
        cartId: cart.id,
        inventoryId,
      },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      await this.prismaService.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await this.prismaService.cartItem.create({
        data: {
          cartId: cart.id,
          inventoryId,
          quantity,
        },
      });
    }

    await this.prismaService.inventoryItem.update({
      where: { id: inventoryId },
      data: {
        reserved: { increment: quantity },
      },
    });

    return this.getCart(sessionId);
  }

  async updateItemQuantity(
    sessionId: string,
    itemId: string,
    updateDto: UpdateCartItemDto,
  ): Promise<ICartWithDetails> {
    const { quantity } = updateDto;

    const cartItem = await this.prismaService.cartItem.findFirst({
      where: { id: itemId },
      include: {
        cart: true,
        inventory: true,
      },
    });

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      throw new NotFoundException('Item do carrinho não encontrado');
    }

    if (quantity <= 0) {
      return this.removeItem(sessionId, itemId);
    }

    const inventory = cartItem.inventory;
    const available = inventory.stock - inventory.reserved + cartItem.quantity;

    if (available < quantity) {
      throw new BadRequestException(`Estoque insuficiente. Disponível: ${available}`);
    }

    const reservedDiff = quantity - cartItem.quantity;

    await this.prismaService.inventoryItem.update({
      where: { id: cartItem.inventoryId },
      data: {
        reserved: { increment: reservedDiff },
      },
    });

    await this.prismaService.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return this.getCart(sessionId);
  }

  async removeItem(sessionId: string, itemId: string): Promise<ICartWithDetails> {
    const cartItem = await this.prismaService.cartItem.findFirst({
      where: { id: itemId },
      include: {
        cart: true,
      },
    });

    if (!cartItem || cartItem.cart.sessionId !== sessionId) {
      throw new NotFoundException('Item do carrinho não encontrado');
    }

    await this.prismaService.inventoryItem.update({
      where: { id: cartItem.inventoryId },
      data: {
        reserved: { decrement: cartItem.quantity },
      },
    });

    await this.prismaService.cartItem.delete({
      where: { id: itemId },
    });

    const cart = await this.prismaService.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    });

    if (cart && cart.items.length === 0) {
      await this.prismaService.cart.delete({
        where: { sessionId },
      });
    }

    return this.getCart(sessionId);
  }

  async clearCart(sessionId: string): Promise<void> {
    const cart = await this.prismaService.cart.findUnique({
      where: { sessionId },
      include: {
        items: true,
      },
    });

    if (cart) {
      for (const item of cart.items) {
        await this.prismaService.inventoryItem.update({
          where: { id: item.inventoryId },
          data: {
            reserved: { decrement: item.quantity },
          },
        });
      }

      await this.prismaService.cart.delete({
        where: { sessionId },
      });
    }
  }

  async getCartSummary(sessionId: string): Promise<{
    items: CartItemDto[];
    subtotal: number;
    total: number;
    itemCount: number;
  }> {
    const cart = await this.getCart(sessionId);
    
    const items: CartItemDto[] = cart.items.map((item) => {
      const subtotal = item.inventory.price * item.quantity;
      return {
        inventoryId: item.inventoryId,
        quantity: item.quantity,
        productName: item.inventory.product.name,
        productSlug: item.inventory.product.slug,
        brandName: item.inventory.product.brand.name,
        size: item.inventory.size,
        color: item.inventory.color,
        price: item.inventory.price,
        subtotal,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const total = subtotal;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { items, subtotal, total, itemCount };
  }
}