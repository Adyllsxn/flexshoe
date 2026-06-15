import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function deleteProduct(id: string): Promise<{ message: string; product: Product } | null> {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return null;
  }
}