import { api } from "./api";

export type RegisterPayload = {
  email: string;
  phone: string;
  password: string;
  password2: string;
  full_name?: string;
  address?: string;
};

export const loginService = async (identifier: string, password: string) => {
  const response = await api.post("/login/", { identifier, password });
  return response.data;
};

export const registerService = async (payload: RegisterPayload) => {
  const response = await api.post("/register/", payload);
  return response.data;
};

export const refreshTokenService = async (refresh: string) => {
  const response = await api.post("/token/refresh/", { refresh });
  return response.data;
};
