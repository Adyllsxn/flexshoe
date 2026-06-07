import { api } from "@/lib/api.connection";

export async function clearCart(): Promise<{ message: string } | null> {
  try {
    const response = await api.delete("/cart/clear");
    return response.data;
  } catch (error) {
    return null;
  }
}