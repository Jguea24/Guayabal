import { UserProfile } from "../shared/storage/authStorage";
import { RegisterPayload } from "../services/authService";

type LoginUser = {
  full_name?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  phone_number?: string;
  address?: string;
  main_address?: string;
  role?: string;
  role_reason?: string;
  photo_url?: string;
  role_label?: string;
};

export const extractAuthError = (err: unknown, fallback: string) => {
  const error = err as any;

  if (error?.message && String(error.message).includes("Network Error")) {
    return "No se pudo conectar al servidor. Revisa IP/puerto.";
  }

  const responseData = error?.response?.data;
  const firstValue =
    responseData && typeof responseData === "object"
      ? Object.values(responseData)[0]
      : undefined;

  const detail =
    responseData?.detail ||
    (Array.isArray(firstValue) ? firstValue[0] : firstValue);

  return detail ? String(detail) : fallback;
};

export const buildProfileFromRegisterPayload = (
  payload: RegisterPayload & { role?: string; role_reason?: string }
): UserProfile => ({
  full_name: payload.full_name,
  email: payload.email,
  phone: payload.phone,
  address: payload.address,
  role: payload.role,
  role_reason: payload.role_reason,
});

export const buildProfileFromLoginUser = (
  user: LoginUser = {}
): UserProfile => ({
  full_name: user.full_name || user.name || user.username,
  email: user.email,
  phone: user.phone || user.phone_number,
  address: user.address || user.main_address,
  role: user.role,
  role_reason: user.role_reason,
  photo_url: user.photo_url,
  role_label: user.role_label,
});

export const resolveLoginDisplayName = (
  user: LoginUser = {},
  identifier: string
) => user.full_name || user.email || user.username || identifier;
