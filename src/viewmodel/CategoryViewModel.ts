import { useEffect, useState } from "react";
import { getCategoriesService } from "../services/categoryService";
import { Category } from "../model/Category";

export function useCategoryViewModel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getCategoriesService();
        if (mounted) setCategories(data);
      } catch {
        if (mounted) setError("No se pudieron cargar categorías");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { categories, loading, error };
}
