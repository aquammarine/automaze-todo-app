import { api } from "@/shared/lib/axios";
import type { AuthResponse } from "../types/auth.types";

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};
