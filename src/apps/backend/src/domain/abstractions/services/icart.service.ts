import { ICartWithDetails, CartItemDto } from '../types/cart.type';
import { AddToCartDto } from 'src/presentation/modules/business/cart/dto/add-to-cart.dto';
import { UpdateCartItemDto } from 'src/presentation/modules/business/cart/dto/update-cart-item.dto';

export interface ICartService {
  getCart(sessionId: string): Promise<ICartWithDetails>;
  addItem(
    sessionId: string,
    addToCartDto: AddToCartDto,
  ): Promise<ICartWithDetails>;
  updateItemQuantity(
    sessionId: string,
    itemId: string,
    updateDto: UpdateCartItemDto,
  ): Promise<ICartWithDetails>;
  removeItem(sessionId: string, itemId: string): Promise<ICartWithDetails>;
  clearCart(sessionId: string): Promise<void>;
  getCartSummary(sessionId: string): Promise<{
    items: CartItemDto[];
    subtotal: number;
    total: number;
    itemCount: number;
  }>;
}
