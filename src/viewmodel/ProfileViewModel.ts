import { useCallback, useEffect, useState } from "react";
import { getProfileService } from "../services/profileService";
import { saveUserProfile } from "../shared/storage/authStorage";

export function useProfileViewModel() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfileService();
      setProfile(data);
      await saveUserProfile({
        full_name: data.full_name || data.name || data.username,
        email: data.email,
        phone: data.phone || data.phone_number,
        address: data.address || data.main_address,
        role: data.role,
        role_reason: data.role_reason,
      });
    } catch (err: any) {
      setError("No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return { profile, loading, error, reload: loadProfile };
}
