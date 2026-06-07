import { api } from "@/lib/api.connection";
import type { LoginCredentials, LoginResponse } from "../types/auth.types";

export async function login(credentials: LoginCredentials): Promise<LoginResponse | null> {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return null;
  }
}