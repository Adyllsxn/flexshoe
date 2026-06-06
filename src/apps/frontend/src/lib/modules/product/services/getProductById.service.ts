import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null;
  }
}