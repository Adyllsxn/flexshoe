import { api } from "@/lib/api.connection";
import type { UpdateRoleRequest, UpdateRoleResponse } from "../types/permission.types";

export async function updateUserRole(data: UpdateRoleRequest): Promise<UpdateRoleResponse | null> {
  try {
    const response = await api.patch("/permission/users/role", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar role do usuário:", error);
    return null;
  }
}