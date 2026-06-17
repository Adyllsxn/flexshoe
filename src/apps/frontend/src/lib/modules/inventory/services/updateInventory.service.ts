import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

interface UpdateInventoryData {
  productId?: string;
  size?: number;
  color?: string;
  sku?: string;
  stock?: number;
  active?: boolean;
}

export async function updateInventory(id: string, data: UpdateInventoryData): Promise<InventoryItem | null> {
  try {
    const response = await api.patch(`/inventory/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar item de inventário:", error);
    return null;
  }
}