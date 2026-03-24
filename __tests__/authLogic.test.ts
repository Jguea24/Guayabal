import {
  buildProfileFromLoginUser,
  buildProfileFromRegisterPayload,
  extractAuthError,
  resolveLoginDisplayName,
} from "../src/viewmodel/authLogic";

describe("authLogic", () => {
  it("devuelve un mensaje claro para errores de red", () => {
    expect(
      extractAuthError(new Error("Network Error"), "Credenciales incorrectas")
    ).toBe("No se pudo conectar al servidor. Revisa IP/puerto.");
  });

  it("extrae el primer error util desde la respuesta del backend", () => {
    const error = {
      response: {
        data: {
          email: ["El correo ya existe"],
        },
      },
    };

    expect(extractAuthError(error, "Error al registrar usuario")).toBe(
      "El correo ya existe"
    );
  });

  it("usa el fallback cuando no hay detalle aprovechable", () => {
    expect(extractAuthError({}, "Credenciales incorrectas")).toBe(
      "Credenciales incorrectas"
    );
  });

  it("transforma el payload de registro a un perfil almacenable", () => {
    expect(
      buildProfileFromRegisterPayload({
        email: "cliente@guayabal.com",
        phone: "0999999999",
        password: "123456",
        password2: "123456",
        full_name: "Cliente Demo",
        address: "Centro",
        role: "client",
        role_reason: "Compra",
      })
    ).toEqual({
      full_name: "Cliente Demo",
      email: "cliente@guayabal.com",
      phone: "0999999999",
      address: "Centro",
      role: "client",
      role_reason: "Compra",
    });
  });

  it("normaliza los datos del usuario recibido en login", () => {
    expect(
      buildProfileFromLoginUser({
        name: "Maria Perez",
        email: "maria@guayabal.com",
        phone_number: "0988888888",
        main_address: "Urdesa",
        role: "client",
        role_reason: "Compra frecuente",
      })
    ).toEqual({
      full_name: "Maria Perez",
      email: "maria@guayabal.com",
      phone: "0988888888",
      address: "Urdesa",
      role: "client",
      role_reason: "Compra frecuente",
    });
  });

  it("tolera usuario vacio y usa username/phone/address alternativos", () => {
    expect(
      buildProfileFromLoginUser({
        username: "mperez",
        phone: "0970000000",
        address: "Centro",
      })
    ).toEqual({
      full_name: "mperez",
      email: undefined,
      phone: "0970000000",
      address: "Centro",
      role: undefined,
      role_reason: undefined,
    });

    expect(buildProfileFromLoginUser()).toEqual({
      full_name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
      role: undefined,
      role_reason: undefined,
    });
  });

  it("resuelve el nombre visible con prioridad sobre el identificador", () => {
    expect(
      resolveLoginDisplayName(
        { full_name: "Ana Torres", email: "ana@guayabal.com" },
        "0990000000"
      )
    ).toBe("Ana Torres");

    expect(
      resolveLoginDisplayName({ email: "ana@guayabal.com" }, "0990000000")
    ).toBe("ana@guayabal.com");
    expect(resolveLoginDisplayName({ username: "atorres" }, "0990000000")).toBe(
      "atorres"
    );
    expect(resolveLoginDisplayName(undefined as any, "0990000000")).toBe(
      "0990000000"
    );
    expect(resolveLoginDisplayName({}, "0990000000")).toBe("0990000000");
  });
});
