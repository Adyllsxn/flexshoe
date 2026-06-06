import { api } from "@/lib/api.connection";
import type { CartResponse } from "../types/cart.types";

export async function getCart(): Promise<CartResponse | null> {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return null;
  }
}