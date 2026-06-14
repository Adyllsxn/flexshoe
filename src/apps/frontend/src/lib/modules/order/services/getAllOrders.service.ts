import { api } from "@/lib/api.connection";
import type { Order, PaginatedResponse } from "../types/order.types";

export async function getAllOrders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order> | null> {
  try {
    const response = await api.get(`/order?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return null;
  }
}