import { api } from "@/lib/api.connection";
import type { User, UpdateUserData } from "../types/user.types";

export async function updateUser(id: string, data: UpdateUserData): Promise<User | null> {
  try {
    const response = await api.patch(`/account/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return null;
  }
}