import { api } from "@/lib/api.connection";
import type { Brand } from "../types/brand.types";

export async function restoreBrand(id: string): Promise<Brand | null> {
  try {
    const response = await api.patch(`/brand/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error("Erro ao restaurar marca:", error);
    return null;
  }
}