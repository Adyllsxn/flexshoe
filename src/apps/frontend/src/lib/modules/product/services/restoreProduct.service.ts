import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function restoreProduct(id: string): Promise<{ message: string; product: Product } | null> {
  try {
    const response = await api.patch(`/product/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error("Erro ao restaurar produto:", error);
    return null;
  }
}