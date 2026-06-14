import { api } from "@/lib/api.connection";
import type { ChangePasswordData } from "../types/user.types";

export async function changePassword(data: ChangePasswordData): Promise<{ message: string } | null> {
  try {
    const response = await api.post("/password/change", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return null;
  }
}