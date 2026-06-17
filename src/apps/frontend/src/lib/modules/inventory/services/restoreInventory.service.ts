import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

export async function restoreInventory(id: string): Promise<InventoryItem | null> {
  try {
    const response = await api.patch(`/inventory/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error("Erro ao restaurar item de inventário:", error);
    return null;
  }
}