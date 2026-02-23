import { useEffect, useState } from "react";
import { getProductsService } from "../services/productService";
import { Product } from "../model/Product";

export function useProductViewModel(category?: string | number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductsService(category);
        if (isMounted) {
          setProducts(data);
        }
      } catch {
        if (isMounted) setError("Error al cargar productos");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProducts();
    return () => {
      isMounted = false;
    };
  }, [category]);

  return { products, loading, error };
}
