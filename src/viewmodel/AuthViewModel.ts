import { useState } from "react";
import {
  loginService,
  registerService,
  RegisterPayload,
} from "../services/authService";
import { setTokens } from "../services/api";
import { saveUsername } from "../shared/storage/authStorage";

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
        const displayName =
          data.user?.full_name || data.user?.email || identifier;
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
