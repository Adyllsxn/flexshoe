import { api } from "@/lib/api.connection";
import type { LogoutResponse } from "../types/auth.types";

export async function logout(): Promise<LogoutResponse | null> {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    return null;
  }
}