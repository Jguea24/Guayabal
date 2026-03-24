import axios from "axios";
import { Platform } from "react-native";
import {
  getToken,
  getRefreshToken,
  removeToken,
  saveAuthTokens,
} from "../shared/storage/authStorage";

const DEFAULT_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8000/"
    : "http://localhost:8000/";

export const api = axios.create({
  baseURL: DEFAULT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 8000,
});

let accessToken = "";
let refreshToken = "";

export const hydrateTokens = async () => {
  accessToken = (await getToken()) || "";
  refreshToken = (await getRefreshToken()) || "";
  return { accessToken, refreshToken };
};

export const setTokens = async (tokens: { access: string; refresh?: string }) => {
  accessToken = tokens.access;
  if (tokens.refresh) refreshToken = tokens.refresh;
  await saveAuthTokens(accessToken, refreshToken);
};

export const clearTokens = async () => {
  accessToken = "";
  refreshToken = "";
  await removeToken();
};

export const resolveApiUrl = (path?: string | null) => {
  if (!path) return undefined;
  if (/^https?:\/\//i.test(path)) return path;

  const base = api.defaults.baseURL || DEFAULT_BASE_URL;
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith("/") ? path : "/" + path;

  return normalizedBase + normalizedPath;
};

api.interceptors.request.use((config) => {
  if (accessToken) {
    if (config.headers && typeof (config.headers as any).set === "function") {
      (config.headers as any).set("Authorization", "Bearer " + accessToken);
    } else {
      config.headers = {
        ...(config.headers || {}),
        Authorization: "Bearer " + accessToken,
      } as any;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original: any = error.config || {};
    if (error.response?.status === 401 && refreshToken && !original._retry) {
      original._retry = true;
      try {
        const base = api.defaults.baseURL || DEFAULT_BASE_URL;
        const refreshUrl = base.endsWith("/")
          ? base + "token/refresh/"
          : base + "/token/refresh/";
        const { data } = await axios.post(refreshUrl, {
          refresh: refreshToken,
        });
        await setTokens({ access: data.access, refresh: refreshToken });
        return api(original);
      } catch (refreshErr) {
        await clearTokens();
      }
    }
    return Promise.reject(error);
  }
);
