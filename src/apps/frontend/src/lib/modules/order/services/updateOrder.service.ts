import { api } from "@/lib/api.connection";
import type { Order } from "../types/order.types";

interface UpdateOrderData {
  clientName?: string;
  clientPhone?: string;
  clientAddress?: string;
}

export async function updateOrder(id: string, data: UpdateOrderData): Promise<Order | null> {
  try {
    const response = await api.patch(`/order/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar pedido ${id}:`, error);
    return null;
  }
}