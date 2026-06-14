import { api } from "@/lib/api.connection";
import type { Store } from "../types/store.types";

interface UpdateStoreData {
  name?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  primaryColor?: string;
}

export async function updateStore(data: UpdateStoreData): Promise<Store | null> {
  try {
    const response = await api.patch("/store", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados da loja:", error);
    return null;
  }
}