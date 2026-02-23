import { api } from "./api";

export type ProfileResponse = {
  id?: number;
  username?: string;
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  address?: string;
  main_address?: string;
  role?: string;
  role_reason?: string;
};

export const getProfileService = async (): Promise<ProfileResponse> => {
  const response = await api.get("/me/");
  return response.data;
};

export const updateProfileService = async (
  body: Partial<ProfileResponse>
): Promise<ProfileResponse> => {
  const response = await api.patch("/me/", body);
  return response.data;
};

export const changePasswordService = async (
  current_password: string,
  new_password: string,
  new_password2?: string
) => {
  const response = await api.post("/me/change-password/", {
    current_password,
    new_password,
    new_password2,
  });
  return response.data;
};
