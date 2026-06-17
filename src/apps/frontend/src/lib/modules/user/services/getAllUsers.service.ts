import { api } from "@/lib/api.connection";
import type { User, PaginatedResponse } from "../types/user.types";

export async function getAllUsers(
  page: number = 1,
  limit: number = 10,
  includeDeleted: boolean = false
): Promise<PaginatedResponse<User> | null> {
  try {
    const endpoint = includeDeleted ? '/account/all' : '/account';
    const response = await api.get(`${endpoint}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return null;
  }
}