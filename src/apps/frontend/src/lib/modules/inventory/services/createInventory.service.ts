import { api } from "@/lib/api.connection";
import type { InventoryItem } from "../types/inventory.types";

interface CreateInventoryData {
  productId: string;
  size: number;
  color: string;
  sku: string;
  stock: number;
  active: boolean;
}

export async function createInventory(data: CreateInventoryData): Promise<InventoryItem | null> {
  try {
    const response = await api.post("/inventory", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar item de inventário:", error);
    return null;
  }
}