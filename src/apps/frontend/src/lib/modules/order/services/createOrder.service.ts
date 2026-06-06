import { api } from "@/lib/api.connection";
import type { CreateOrderDto, OrderResponse } from "../types/order.types";

export async function createOrder(data: CreateOrderDto): Promise<OrderResponse | null> {
  try {
    const response = await api.post("/order", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return null;
  }
}