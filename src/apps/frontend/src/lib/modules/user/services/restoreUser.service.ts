import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function restoreUser(id: string): Promise<{ message: string; account: User } | null> {
  try {
    const response = await api.patch(`/account/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao restaurar usuário ${id}:`, error);
    return null;
  }
}