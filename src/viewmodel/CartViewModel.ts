import { useState } from "react";
import { addToCartService } from "../services/cartService";

export function useCartViewModel() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const addToCart = async (productId: number) => {
    try {
      setLoading(true);
      setMessage(null);

      await addToCartService(productId);
      setMessage("Producto agregado al carrito");
    } catch {
      setMessage("Error al agregar al carrito");
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, message };
}
