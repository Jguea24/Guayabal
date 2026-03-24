import { useCallback, useEffect, useState } from "react";
import {
  getProfileService,
  ProfileResponse,
  UpdateProfilePayload,
  updateProfileService,
} from "../services/profileService";
import { saveUserProfile } from "../shared/storage/authStorage";
import { buildCachedProfile } from "./profileLogic";

export function useProfileViewModel() {
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfileService();
      setProfile(data);
      await saveUserProfile(buildCachedProfile(data));
    } catch (err: any) {
      setError("No se pudo cargar el perfil");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    setSaving(true);
    setError(null);

    try {
      const data = await updateProfileService(payload);
      let mergedProfile: ProfileResponse = data;

      setProfile((current) => {
        mergedProfile = {
          ...(current || {}),
          ...(data || {}),
          preferences: {
            ...(current?.preferences || {}),
            ...(data?.preferences || {}),
          },
        };

        return mergedProfile;
      });

      await saveUserProfile(buildCachedProfile(mergedProfile));
      return true;
    } catch (err: any) {
      setError("No se pudo actualizar el perfil");
      return false;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    profile,
    loading,
    saving,
    error,
    reload: loadProfile,
    updateProfile,
  };
}
