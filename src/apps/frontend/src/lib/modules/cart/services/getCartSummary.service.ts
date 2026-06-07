import { api } from "@/lib/api.connection";
import type { CartSummary } from "../types/cart.types";

export async function getCartSummary(): Promise<CartSummary | null> {
  try {
    const response = await api.get("/cart/summary");
    return response.data;
  } catch (error) {
    return null;
  }
}