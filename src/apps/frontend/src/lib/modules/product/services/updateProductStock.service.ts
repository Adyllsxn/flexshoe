import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function updateProductStock(id: string, quantity: number): Promise<Product | null> {
  try {
    const response = await api.patch(`/product/${id}/stock?quantity=${quantity}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    return null;
  }
}