const mockStore: Record<string, string> = {};

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(async (key: string, value: string) => {
    mockStore[key] = value;
  }),
  getItem: jest.fn(async (key: string) => mockStore[key] ?? null),
  multiRemove: jest.fn(async (keys: string[]) => {
    keys.forEach((key) => {
      delete mockStore[key];
    });
  }),
}));

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getRefreshToken,
  getToken,
  getUsername,
  getUserProfile,
  removeToken,
  saveAuthTokens,
  saveToken,
  saveUserProfile,
  saveUsername,
} from "../src/shared/storage/authStorage";

describe("authStorage", () => {
  beforeEach(() => {
    Object.keys(mockStore).forEach((key) => delete mockStore[key]);
    jest.clearAllMocks();
  });

  it("mezcla el perfil nuevo con el ya almacenado", async () => {
    await saveUserProfile({
      full_name: "Laura",
      email: "laura@guayabal.com",
    });

    await saveUserProfile({
      phone: "0955555555",
      address: "Alborada",
    });

    await expect(getUserProfile()).resolves.toEqual({
      full_name: "Laura",
      email: "laura@guayabal.com",
      phone: "0955555555",
      address: "Alborada",
    });
  });

  it("retorna null cuando el JSON almacenado es invalido", async () => {
    mockStore.auth_profile = "{json-invalido";

    await expect(getUserProfile()).resolves.toBeNull();
  });

  it("guarda token simple y permite leer username y refresh por separado", async () => {
    await saveToken("token-simple");
    await saveUsername("usuario-demo");
    await saveAuthTokens("token-access", "token-refresh");

    await expect(getToken()).resolves.toBe("token-access");
    await expect(getUsername()).resolves.toBe("usuario-demo");
    await expect(getRefreshToken()).resolves.toBe("token-refresh");
  });

  it("elimina tokens y perfil al cerrar sesion", async () => {
    await saveAuthTokens("token-access", "token-refresh");
    await saveUsername("usuario-demo");
    await saveUserProfile({ full_name: "Usuario Demo" });

    await removeToken();

    await expect(getToken()).resolves.toBeNull();
    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      "auth_token",
      "refresh_token",
      "auth_username",
      "auth_profile",
    ]);
  });

  it("no guarda refresh cuando no se envia", async () => {
    await saveAuthTokens("solo-access");

    expect((AsyncStorage.setItem as jest.Mock).mock.calls).toEqual([
      ["auth_token", "solo-access"],
    ]);
  });

  it("tolera guardar perfil vacio sin romper el merge", async () => {
    await saveUserProfile(undefined as any);

    await expect(getUserProfile()).resolves.toEqual({});
  });
});
