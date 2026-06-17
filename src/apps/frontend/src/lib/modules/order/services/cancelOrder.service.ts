import { api } from "@/lib/api.connection";

export async function cancelOrder(id: string): Promise<{ message: string } | null> {
  try {
    const response = await api.delete(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao cancelar pedido ${id}:`, error);
    return null;
  }
}