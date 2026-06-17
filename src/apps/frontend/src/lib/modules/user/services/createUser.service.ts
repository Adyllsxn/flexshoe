import { api } from "@/lib/api.connection";
import type { User } from "../types/user.types";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export async function createUser(data: CreateUserData): Promise<User | null> {
  try {
    const response = await api.post("/account", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return null;
  }
}