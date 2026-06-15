import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function createProduct(data: FormData): Promise<Product | null> {
  try {
    const response = await api.post("/product", data, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    return null;
  }
}