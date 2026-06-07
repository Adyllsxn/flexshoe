import { api } from "@/lib/api.connection";
import type { Store } from "../types/store.types";

export async function getStore(): Promise<Store | null> {
  try {
    const response = await api.get("/store");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados da loja:", error);
    return null;
  }
}