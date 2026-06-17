import { api } from "@/lib/api.connection";
import type { UserPermission } from "../types/permission.types";

export async function getUserPermission(userId: string): Promise<UserPermission | null> {
  try {
    const response = await api.get(`/permission/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar permissão do usuário ${userId}:`, error);
    return null;
  }
}