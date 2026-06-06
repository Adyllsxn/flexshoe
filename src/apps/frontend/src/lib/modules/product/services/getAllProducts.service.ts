import { api } from "@/lib/api.connection";
import type { Product, PaginatedResponse, ProductFilters } from "../types/product.types";

export async function getAllProducts(
  filters?: ProductFilters
): Promise<PaginatedResponse<Product>> {
  const { page = 1, limit = 8, brand, gender, search } = filters || {};
  
  // Garantir que limit é um número inteiro positivo
  const validPage = Math.max(1, Number(page) || 1);
  const validLimit = Math.max(1, Number(limit) || 8);
  
  const params: Record<string, any> = { 
    page: validPage, 
    limit: validLimit 
  };
  
  if (brand) params.brand = brand;
  if (gender) params.gender = gender;
  if (search) params.search = search;
  
  console.log('📡 Enviando para API:', params);
  
  const response = await api.get("/product", { params });
  return response.data;
}