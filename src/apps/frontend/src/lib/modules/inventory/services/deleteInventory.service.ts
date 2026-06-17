import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

export async function deleteInventory(id: string): Promise<InventoryItem | null> {
  try {
    const response = await api.delete(`/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar item de inventário:", error);
    return null;
  }
}