import {
  ProfileStat,
  ProfileMenuItem,
  ProfileMenuSection,
  UserProfile,
} from "../shared/storage/authStorage";
import { ProfileResponse } from "../services/profileService";

type ProfileCandidate = UserProfile & {
  name?: string;
  username?: string;
  phone_number?: string;
  main_address?: string;
  user_type?: string;
  notifications_enabled?: boolean;
  language?: string;
  dark_mode?: boolean;
};

const pickFirstFilled = (...values: Array<unknown>): string | undefined => {
  const match = values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      String(value).trim().length > 0
  );

  return match === undefined ? undefined : String(match);
};

const pickFirstDefined = <T>(...values: Array<T | undefined | null>) =>
  values.find((value) => value !== undefined && value !== null);

const slugify = (value?: string | null) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const normalizePreferences = (profile?: ProfileCandidate | null) => ({
  notifications_enabled: pickFirstDefined(
    profile?.preferences?.notifications_enabled as boolean | undefined,
    profile?.notifications_enabled
  ),
  language: pickFirstFilled(
    profile?.preferences?.language,
    profile?.language
  ) as string | undefined,
  dark_mode: pickFirstDefined(
    profile?.preferences?.dark_mode as boolean | undefined,
    profile?.dark_mode
  ),
});

const normalizeStats = (stats?: unknown): ProfileStat[] | undefined =>
  Array.isArray(stats) ? (stats as ProfileStat[]) : undefined;

const normalizeMenuSections = (
  sections?: unknown
): ProfileMenuSection[] | undefined =>
  Array.isArray(sections) ? (sections as ProfileMenuSection[]) : undefined;

export const buildCachedProfile = (
  profile: ProfileResponse
): UserProfile => ({
  full_name: profile.full_name || profile.name || profile.username,
  email: profile.email,
  phone: profile.phone || profile.phone_number,
  address: profile.address || profile.main_address,
  role: profile.role,
  role_reason: profile.role_reason,
  photo_url: profile.photo_url,
  role_label: profile.role_label || getRoleLabel(profile.role),
  preferences: normalizePreferences(profile),
  stats: normalizeStats(profile.stats),
  menu_sections: normalizeMenuSections(profile.menu_sections),
});

export const mergeDisplayProfile = (
  apiProfile?: ProfileCandidate | null,
  cachedProfile?: ProfileCandidate | null
) => {
  const api = apiProfile || {};
  const cached = cachedProfile || {};
  const apiPreferences = normalizePreferences(api);
  const cachedPreferences = normalizePreferences(cached);
  const resolvedRole = pickFirstFilled(api.role, api.user_type, cached.role);

  return {
    full_name: pickFirstFilled(
      api.full_name,
      api.name,
      api.username,
      cached.full_name,
      cached.name,
      cached.username
    ),
    email: pickFirstFilled(api.email, cached.email),
    phone: pickFirstFilled(
      api.phone,
      api.phone_number,
      cached.phone,
      cached.phone_number
    ),
    address: pickFirstFilled(
      api.address,
      api.main_address,
      cached.address,
      cached.main_address
    ),
    role: resolvedRole,
    role_reason: pickFirstFilled(api.role_reason, cached.role_reason),
    photo_url: pickFirstFilled(api.photo_url, cached.photo_url),
    role_label: pickFirstFilled(
      api.role_label,
      cached.role_label,
      getRoleLabel(resolvedRole)
    ),
    preferences: {
      notifications_enabled: pickFirstDefined(
        apiPreferences.notifications_enabled,
        cachedPreferences.notifications_enabled
      ),
      language: pickFirstFilled(
        apiPreferences.language,
        cachedPreferences.language
      ),
      dark_mode: pickFirstDefined(
        apiPreferences.dark_mode,
        cachedPreferences.dark_mode
      ),
    },
    stats: normalizeStats(pickFirstDefined(api.stats, cached.stats)),
    menu_sections: normalizeMenuSections(
      pickFirstDefined(api.menu_sections, cached.menu_sections)
    ),
  };
};

export const getRoleLabel = (role?: string | null) => {
  const roleRaw = role || "";
  const key = String(roleRaw).toLowerCase();
  const map: Record<string, string> = {
    client: "Cliente",
    driver: "Driver",
    provider: "Proveedor",
  };

  return map[key] || roleRaw;
};

export const valueOrDash = (value?: string | null) =>
  value && String(value).trim().length ? String(value) : "No disponible";

export const getLanguageLabel = (language?: string | null) => {
  const key = String(language || "").trim().toLowerCase();
  const map: Record<string, string> = {
    es: "Espanol",
    en: "Ingles",
  };

  return map[key] || valueOrDash(language);
};

export const getMenuItemKey = (item?: ProfileMenuItem | null) =>
  slugify(item?.id || item?.title);

export const getMenuItemPreferenceKey = (
  item?: ProfileMenuItem | null
): "notifications_enabled" | "language" | "dark_mode" | null => {
  const key = getMenuItemKey(item);
  const title = String(item?.title || "").toLowerCase();

  if (
    ["notifications", "notification", "notifications_enabled"].includes(key) ||
    title.includes("notific")
  ) {
    return "notifications_enabled";
  }

  if (
    key.includes("language") ||
    key.includes("idioma") ||
    title.includes("idioma")
  ) {
    return "language";
  }

  if (
    key.includes("dark_mode") ||
    key.includes("modo_oscuro") ||
    key.includes("dark") ||
    title.includes("oscuro")
  ) {
    return "dark_mode";
  }

  return null;
};

export const getProfileMenuSections = (
  profile?: ProfileCandidate | null
): ProfileMenuSection[] => {
  const sections = normalizeMenuSections(profile?.menu_sections);
  if (Array.isArray(sections) && sections.length) {
    return sections;
  }

  const preferences = normalizePreferences(profile);

  return [
    {
      id: "account",
      title: "Cuenta",
      items: [
        {
          id: "profile_info",
          title: "Informacion del perfil",
          subtitle:
            (pickFirstFilled(
              profile?.email,
              profile?.phone,
              profile?.full_name
            ) as string | undefined) || "Completa tus datos personales",
        },
        {
          id: "profile_photo",
          title: "Foto de perfil",
          subtitle: profile?.photo_url
            ? "Foto configurada"
            : "Selecciona una foto para tu cuenta",
        },
        {
          id: "addresses",
          title: "Mis direcciones",
          subtitle:
            (pickFirstFilled(profile?.address) as string | undefined) ||
            "Agrega tu direccion principal",
        },
      ],
    },
    {
      id: "preferences",
      title: "Preferencias",
      items: [
        {
          id: "notifications_enabled",
          title: "Notificaciones",
          subtitle:
            preferences.notifications_enabled === undefined
              ? "Configura tus alertas"
              : preferences.notifications_enabled
                ? "Activadas"
                : "Desactivadas",
        },
        {
          id: "language",
          title: "Idioma",
          subtitle: getLanguageLabel(preferences.language || "es"),
        },
        {
          id: "dark_mode",
          title: "Modo oscuro",
          subtitle:
            preferences.dark_mode === undefined
              ? "Ajuste disponible"
              : preferences.dark_mode
                ? "Activado"
                : "Desactivado",
        },
      ],
    },
  ];
};
