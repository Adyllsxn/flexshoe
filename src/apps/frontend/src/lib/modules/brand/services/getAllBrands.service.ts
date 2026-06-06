// lib/modules/brand/services/getAllBrands.service.ts
import { api } from "@/lib/api.connection";
import type { Brand } from "../types/brand.types";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const response = await api.get("/brand");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return [];
  }
}