import { api } from "@/lib/api.connection";
import type { CartResponse, UpdateCartItemDto } from "../types/cart.types";

export async function updateCartItem(itemId: string, data: UpdateCartItemDto): Promise<CartResponse | null> {
  try {
    const response = await api.patch(`/cart/item/${itemId}`, data);
    return response.data;
  } catch (error) {
    return null;
  }
}