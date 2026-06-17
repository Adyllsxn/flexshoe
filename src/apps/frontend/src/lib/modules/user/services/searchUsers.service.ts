import { api } from "@/lib/api.connection";
import type { User, PaginatedResponse } from "../types/user.types";

export async function searchUsers(
  name: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<User> | null> {
  try {
    const response = await api.get(`/account/search?page=${page}&limit=${limit}&name=${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar usuários por nome ${name}:`, error);
    return null;
  }
}