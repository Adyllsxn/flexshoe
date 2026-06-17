import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

export async function updateInventoryStock(id: string, quantity: number): Promise<InventoryItem | null> {
  try {
    const response = await api.patch(`/inventory/${id}/stock?quantity=${quantity}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar estoque:", error);
    return null;
  }
}