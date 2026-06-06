import { api } from "@/lib/api.connection";
import type { Product } from "../types/product.types";

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    // Busca todos os produtos e filtra por slug
    const response = await api.get(`/product?limit=100`);
    const products = response.data.data || [];
    const product = products.find((p: Product) => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error(`Erro ao buscar produto com slug ${slug}:`, error);
    return null;
  }
}