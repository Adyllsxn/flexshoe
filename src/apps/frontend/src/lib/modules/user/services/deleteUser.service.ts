import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function deleteUser(id: string): Promise<{ message: string; account: User } | null> {
  try {
    const response = await api.delete(`/account/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao deletar usuário ${id}:`, error);
    return null;
  }
}