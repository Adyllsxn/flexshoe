import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

export async function getMe(): Promise<User | null> {
  try {
    const response = await api.get("/account/me");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}