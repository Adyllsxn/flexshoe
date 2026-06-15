import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function updateProduct(id: string, data: FormData): Promise<Product | null> {
  try {
    const response = await api.patch(`/product/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    return null;
  }
}