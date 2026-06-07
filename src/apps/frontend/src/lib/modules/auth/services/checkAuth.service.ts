import { api } from "@/lib/api.connection";
import type { AuthCheckResponse } from "../types/auth.types";

export async function checkAuth(): Promise<AuthCheckResponse | null> {
  try {
    const response = await api.get("/auth/check");
    return response.data;
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return null;
  }
}