import { useState } from "react";
import {
  loginService,
  registerService,
  RegisterPayload,
} from "../services/authService";
import { setTokens } from "../services/api";
import {
  saveUsername,
  saveUserProfile,
} from "../shared/storage/authStorage";

export function useAuthViewModel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractError = (err: any, fallback: string) => {
    if (err?.message && err.message.includes("Network Error")) {
      return "No se pudo conectar al servidor. Revisa IP/puerto.";
    }
    const firstValue = Object.values(err?.response?.data || {})[0];
    const detail =
      err?.response?.data?.detail ||
      (firstValue &&
        (Array.isArray(firstValue)
          ? (firstValue as any[])[0]
          : firstValue));
    return detail || fallback;
  };

  const register = async (payload: RegisterPayload) => {
    try {
      setLoading(true);
      setError(null);
      await registerService(payload);
      await saveUserProfile({
        full_name: payload.full_name,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        role_reason: payload.role_reason,
      });
      return true;
    } catch (err: any) {
      setError(String(extractError(err, "Error al registrar usuario")));
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginService(identifier, password);

      if (data?.access) {
        await setTokens({ access: data.access, refresh: data.refresh });
        const user = data.user || {};
        const displayName =
          user.full_name || user.email || user.username || identifier;
        await saveUserProfile({
          full_name: user.full_name || user.name || user.username,
          email: user.email,
          phone: user.phone || user.phone_number,
          address: user.address || user.main_address,
          role: user.role,
          role_reason: user.role_reason,
        });
        await saveUsername(String(displayName));
        return true;
      }

      setError("Respuesta invalida del servidor");
      return false;
    } catch (err: any) {
      setError(String(extractError(err, "Credenciales incorrectas")));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
