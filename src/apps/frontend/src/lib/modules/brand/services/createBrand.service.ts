import { api } from "@/lib/api.connection";
import type { Brand } from "../types/brand.types";

interface CreateBrandData {
  name: string;
  slug: string;
  active: boolean;
}

export async function createBrand(data: CreateBrandData): Promise<Brand | null> {
  try {
    const response = await api.post("/brand", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar marca:", error);
    return null;
  }
}