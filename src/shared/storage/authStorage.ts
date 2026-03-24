import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "auth_token";
const REFRESH_KEY = "refresh_token";
const USERNAME_KEY = "auth_username";
const PROFILE_KEY = "auth_profile";

export type ProfilePreferences = {
  notifications_enabled?: boolean;
  language?: string;
  dark_mode?: boolean;
  [key: string]: unknown;
};

export type ProfileStat = {
  id?: string;
  label?: string;
  value?: string | number | null;
  subtitle?: string;
};

export type ProfileMenuItem = {
  id?: string;
  title?: string;
  subtitle?: string;
  type?: string;
  action?: string;
  value?: string | number | boolean | null;
};

export type ProfileMenuSection = {
  id?: string;
  title?: string;
  items?: ProfileMenuItem[];
};

export type UserProfile = {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: string;
  role_reason?: string;
  photo_url?: string;
  role_label?: string;
  preferences?: ProfilePreferences;
  stats?: ProfileStat[];
  menu_sections?: ProfileMenuSection[];
};

export const saveAuthTokens = async (access: string, refresh?: string) => {
  await AsyncStorage.setItem(TOKEN_KEY, access);
  if (refresh) {
    await AsyncStorage.setItem(REFRESH_KEY, refresh);
  }
};

export const saveUsername = async (username: string) => {
  await AsyncStorage.setItem(USERNAME_KEY, username);
};

export const saveToken = async (token: string) => saveAuthTokens(token);

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const getUsername = async () => {
  return await AsyncStorage.getItem(USERNAME_KEY);
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem(REFRESH_KEY);
};

export const saveUserProfile = async (profile: UserProfile) => {
  const current = await getUserProfile();
  const merged: UserProfile = { ...(current || {}), ...(profile || {}) };
  if (current?.preferences || profile?.preferences) {
    merged.preferences = {
      ...(current?.preferences || {}),
      ...(profile?.preferences || {}),
    };
  }
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(merged));
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const removeToken = async () => {
  await AsyncStorage.multiRemove([
    TOKEN_KEY,
    REFRESH_KEY,
    USERNAME_KEY,
    PROFILE_KEY,
  ]);
};
