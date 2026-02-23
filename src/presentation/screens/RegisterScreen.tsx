import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { useAuthViewModel } from "../../viewmodel/AuthViewModel";
import { registerStyles as styles } from "../styles/register.styles";

export function RegisterScreen({ navigation }: any) {
  const { register, loading, error } = useAuthViewModel();

  const [form, setForm] = useState({
    email: "",
    phone: "",
    full_name: "",
    address: "",
    password: "",
    password2: "",
    role: "client" as "client" | "driver" | "provider",
    role_reason: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const onChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    const success = await register({ ...form });
    if (success) {
      navigation.replace("Login", { presetId: form.email || form.phone });
    }
  };

  const isValid =
    form.email.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.password.trim().length > 0 &&
    form.password2.trim().length > 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.background}>
        <View style={styles.blob} />
        <View style={styles.blobAlt} />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.logoBadge}>
            <Image
              source={require("../../shared/assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View>
            <Text style={styles.brand}>Guayabal</Text>
            <Text style={styles.brandSub}>Licoreria premium</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Registra un nuevo usuario</Text>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#9b8b7b"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => onChange("email", v)}
        />

        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="09xxxxxxxx"
          placeholderTextColor="#9b8b7b"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => onChange("phone", v)}
        />

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Opcional"
          placeholderTextColor="#9b8b7b"
          value={form.full_name}
          onChangeText={(v) => onChange("full_name", v)}
        />

        <Text style={styles.label}>Direccion</Text>
        <TextInput
          style={styles.input}
          placeholder="Calle y numero"
          placeholderTextColor="#9b8b7b"
          value={form.address}
          onChangeText={(v) => onChange("address", v)}
        />

        <Text style={styles.label}>Rol</Text>
        <View style={styles.roleRow}>
          {[
            { key: "client", label: "Cliente" },
            { key: "driver", label: "Driver" },
            { key: "provider", label: "Proveedor" },
          ].map((item, idx, arr) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.roleChip,
                idx === arr.length - 1 && styles.roleChipLast,
                form.role === item.key && styles.roleChipActive,
              ]}
              onPress={() => onChange("role", item.key)}
            >
              <Text
                style={[
                  styles.roleText,
                  form.role === item.key && styles.roleTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.roleHint}>
          Si eliges driver/proveedor, explica el motivo.
        </Text>

        <Text style={styles.label}>Motivo del rol</Text>
        <TextInput
          style={styles.input}
          placeholder="Opcional"
          placeholderTextColor="#9b8b7b"
          value={form.role_reason}
          onChangeText={(v) => onChange("role_reason", v)}
        />

        <Text style={styles.label}>Contrasena</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#9b8b7b"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(v) => onChange("password", v)}
          />
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.toggleText}>
              {showPassword ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar contrasena</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={styles.passwordInput}
            placeholder="********"
            placeholderTextColor="#9b8b7b"
            secureTextEntry={!showPassword2}
            value={form.password2}
            onChangeText={(v) => onChange("password2", v)}
          />
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setShowPassword2(!showPassword2)}
          >
            <Text style={styles.toggleText}>
              {showPassword2 ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleRegister}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Crear cuenta</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
