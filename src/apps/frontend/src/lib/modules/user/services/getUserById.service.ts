import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await api.get(`/account/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuário ${id}:`, error);
    return null;
  }
}