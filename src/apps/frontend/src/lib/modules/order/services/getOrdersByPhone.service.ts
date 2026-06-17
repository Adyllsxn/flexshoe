import { api } from "@/lib/api.connection";
import type { Order, PaginatedResponse } from "../types/order.types";

export async function getOrdersByPhone(
  phone: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Order> | null> {
  try {
    const response = await api.get(`/order/phone/${phone}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar pedidos por telefone ${phone}:`, error);
    return null;
  }
}