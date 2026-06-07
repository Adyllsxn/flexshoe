import { api } from "@/lib/api.connection";
import type { CartResponse, AddToCartDto } from "../types/cart.types";

export async function addToCart(data: AddToCartDto): Promise<CartResponse | null> {
  try {
    const response = await api.post("/cart/add", data);
    return response.data;
  } catch (error) {
    return null;
  }
}