import { api } from "@/lib/api.connection";
import type { Brand } from "../types/brand.types";

interface UpdateBrandData {
  name?: string;
  slug?: string;
  active?: boolean;
}

export async function updateBrand(id: string, data: UpdateBrandData): Promise<Brand | null> {
  try {
    const response = await api.patch(`/brand/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar marca:", error);
    return null;
  }
}