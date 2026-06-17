import { api } from "@/lib/api.connection";
import type { Order } from "../types/order.types";

export async function updateOrderStatus(id: string, status: string): Promise<Order | null> {
  try {
    const response = await api.patch(`/order/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar status do pedido ${id}:`, error);
    return null;
  }
}