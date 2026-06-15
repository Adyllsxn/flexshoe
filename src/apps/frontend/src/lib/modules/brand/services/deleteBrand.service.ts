import { api } from "@/lib/api.connection";
import type { Brand } from "../types/brand.types";

export async function deleteBrand(id: string): Promise<Brand | null> {
  try {
    const response = await api.delete(`/brand/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar marca:", error);
    return null;
  }
}