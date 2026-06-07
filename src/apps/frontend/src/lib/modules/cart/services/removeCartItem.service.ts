import { api } from "@/lib/api.connection";
import type { CartResponse } from "../types/cart.types";

export async function removeCartItem(itemId: string): Promise<CartResponse | null> {
  try {
    const response = await api.delete(`/cart/item/${itemId}`);
    return response.data;
  } catch (error) {
    return null;
  }
}