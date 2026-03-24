import { useState } from "react";
import { addToCartService } from "../services/cartService";

const extractCartError = (err: unknown) => {
  const error = err as any;

  if (error?.message && String(error.message).includes("Network Error")) {
    return "No se pudo conectar al servidor.";
  }

  const data = error?.response?.data;
  const firstValue =
    data && typeof data === "object" ? Object.values(data)[0] : undefined;
  const detail =
    data?.error ||
    data?.detail ||
    (Array.isArray(firstValue) ? firstValue[0] : firstValue);

  return detail ? String(detail) : "Error al agregar al carrito";
};

export function useCartViewModel() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const addToCart = async (productId: number) => {
    try {
      setLoading(true);
      setMessage(null);

      await addToCartService(productId);
      const successMessage = "Producto agregado al carrito";
      setMessage(successMessage);
      return { ok: true, message: successMessage };
    } catch (err) {
      const errorMessage = extractCartError(err);
      setMessage(errorMessage);
      return { ok: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, message };
}
