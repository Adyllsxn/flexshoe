import { api } from "@/lib/api.connection";
import type { Order } from "../types/order.types";

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const response = await api.get(`/order/${id}`);
    const data = response.data;
    if (data && !data.items) {
      data.items = [];
    }
    return data;
  } catch (error) {
    console.error(`Erro ao buscar pedido ${id}:`, error);
    return null;
  }
}