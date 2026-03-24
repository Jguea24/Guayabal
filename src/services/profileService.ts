import {
  ProfileMenuSection,
  ProfilePreferences,
  ProfileStat,
} from "../shared/storage/authStorage";
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
  photo_url?: string;
  role_label?: string;
  preferences?: ProfilePreferences;
  stats?: ProfileStat[];
  menu_sections?: ProfileMenuSection[];
  notifications_enabled?: boolean;
  language?: string;
  dark_mode?: boolean;
};

export type UpdateProfilePayload = {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  notifications_enabled?: boolean;
  language?: string;
  dark_mode?: boolean;
  photo_clear?: boolean;
};

export const getProfileService = async (): Promise<ProfileResponse> => {
  const response = await api.get("/me/");
  return response.data;
};

export const updateProfileService = async (
  body: UpdateProfilePayload
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
