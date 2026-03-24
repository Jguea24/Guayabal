import {
  buildCachedProfile,
  getMenuItemPreferenceKey,
  getProfileMenuSections,
  getRoleLabel,
  mergeDisplayProfile,
  valueOrDash,
} from "../src/viewmodel/profileLogic";

describe("profileLogic", () => {
  it("construye un perfil cacheable desde la respuesta del servicio", () => {
    expect(
      buildCachedProfile({
        username: "jperez",
        email: "jperez@guayabal.com",
        phone_number: "0977777777",
        main_address: "Samborondon",
        role: "provider",
        role_reason: "Distribucion",
        photo_url: "/media/profiles/jperez.jpg",
        preferences: {
          notifications_enabled: true,
          language: "es",
          dark_mode: false,
        },
      })
    ).toEqual({
      full_name: "jperez",
      email: "jperez@guayabal.com",
      phone: "0977777777",
      address: "Samborondon",
      role: "provider",
      role_reason: "Distribucion",
      photo_url: "/media/profiles/jperez.jpg",
      role_label: "Proveedor",
      preferences: {
        notifications_enabled: true,
        language: "es",
        dark_mode: false,
      },
      stats: undefined,
      menu_sections: undefined,
    });
  });

  it("mezcla perfil remoto y cache priorizando valores no vacios", () => {
    expect(
      mergeDisplayProfile(
        {
          full_name: " ",
          email: "api@guayabal.com",
          phone_number: "0966666666",
          user_type: "driver",
          preferences: {
            notifications_enabled: false,
          },
        },
        {
          full_name: "Carlos Ruiz",
          address: "Kennedy",
          role_reason: "Entrega",
          preferences: {
            language: "en",
            dark_mode: true,
          },
        }
      )
    ).toEqual({
      full_name: "Carlos Ruiz",
      email: "api@guayabal.com",
      phone: "0966666666",
      address: "Kennedy",
      role: "driver",
      role_reason: "Entrega",
      photo_url: undefined,
      role_label: "Driver",
      preferences: {
        notifications_enabled: false,
        language: "en",
        dark_mode: true,
      },
      stats: undefined,
      menu_sections: undefined,
    });
  });

  it("traduce roles conocidos y conserva roles desconocidos", () => {
    expect(getRoleLabel("client")).toBe("Cliente");
    expect(getRoleLabel("provider")).toBe("Proveedor");
    expect(getRoleLabel("admin")).toBe("admin");
    expect(getRoleLabel()).toBe("");
  });

  it("devuelve un placeholder cuando el valor no existe", () => {
    expect(valueOrDash(" ")).toBe("No disponible");
    expect(valueOrDash("Activo")).toBe("Activo");
  });

  it("tolera perfiles ausentes y devuelve campos vacios", () => {
    expect(mergeDisplayProfile()).toEqual({
      full_name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      role: undefined,
      role_reason: undefined,
      photo_url: undefined,
      role_label: undefined,
      preferences: {
        notifications_enabled: undefined,
        language: undefined,
        dark_mode: undefined,
      },
      stats: undefined,
      menu_sections: undefined,
    });
  });

  it("crea secciones por defecto para el menu del perfil", () => {
    expect(
      getProfileMenuSections({
        email: "perfil@guayabal.com",
        address: "Urdesa",
        preferences: { dark_mode: true, language: "es" },
      })
    ).toEqual([
      {
        id: "account",
        title: "Cuenta",
        items: [
          {
            id: "profile_info",
            title: "Informacion del perfil",
            subtitle: "perfil@guayabal.com",
          },
          {
            id: "profile_photo",
            title: "Foto de perfil",
            subtitle: "Selecciona una foto para tu cuenta",
          },
          {
            id: "addresses",
            title: "Mis direcciones",
            subtitle: "Urdesa",
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
            subtitle: "Configura tus alertas",
          },
          {
            id: "language",
            title: "Idioma",
            subtitle: "Espanol",
          },
          {
            id: "dark_mode",
            title: "Modo oscuro",
            subtitle: "Activado",
          },
        ],
      },
    ]);
  });

  it("detecta items de preferencias para renderizar toggles", () => {
    expect(
      getMenuItemPreferenceKey({ id: "notifications_enabled" })
    ).toBe("notifications_enabled");
    expect(getMenuItemPreferenceKey({ title: "Idioma" })).toBe("language");
    expect(getMenuItemPreferenceKey({ title: "Modo oscuro" })).toBe(
      "dark_mode"
    );
  });

  it("descarta stats y menu_sections invalidos sin romper el perfil", () => {
    expect(
      mergeDisplayProfile(
        {
          full_name: "Johana",
          stats: {} as any,
          menu_sections: "no-array" as any,
        },
        {
          stats: null as any,
          menu_sections: { broken: true } as any,
        }
      )
    ).toEqual({
      full_name: "Johana",
      email: undefined,
      phone: undefined,
      address: undefined,
      role: undefined,
      role_reason: undefined,
      photo_url: undefined,
      role_label: undefined,
      preferences: {
        notifications_enabled: undefined,
        language: undefined,
        dark_mode: undefined,
      },
      stats: undefined,
      menu_sections: undefined,
    });
  });
});
