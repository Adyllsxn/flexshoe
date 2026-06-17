import { api } from "@/lib/api.connection";
import type { RolesResponse } from "../types/permission.types";

export async function getRoles(): Promise<RolesResponse | null> {
  try {
    const response = await api.get("/permission/roles");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    return null;
  }
}