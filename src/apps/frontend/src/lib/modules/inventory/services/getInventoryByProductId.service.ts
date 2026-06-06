import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

export async function getInventoryByProductId(
  productId: string
): Promise<InventoryItem[]> {
  try {
    const response = await api.get(`/inventory/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar inventory do produto ${productId}:`, error);
    return [];
  }
}