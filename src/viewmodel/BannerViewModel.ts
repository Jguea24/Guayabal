import { useEffect, useState } from "react";
import { getBannersService } from "../services/bannerService";
import { Banner } from "../model/Banner";

export function useBannerViewModel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await getBannersService();
        if (mounted) setBanners(data);
      } catch {
        if (mounted) setError("No se pudieron cargar banners");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { banners, loading, error };
}
