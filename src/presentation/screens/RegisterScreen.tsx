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
    password: "",
    password2: "",
  });

  const onChange = (key: string, value: string) =>
    setForm({ ...form, [key]: value });

  const handleRegister = async () => {
    const success = await register({ ...form, role: "client" });
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

      <View style={styles.header}>
        <Image
          source={require("../../shared/assets/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.brand}>Guayabal</Text>
        <Text style={styles.title}>Crear cuenta</Text>
        <Text style={styles.subtitle}>Registra un nuevo usuario</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => onChange("email", v)}
        />

        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="09xxxxxxxx"
          placeholderTextColor="#6b7280"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={(v) => onChange("phone", v)}
        />

        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Opcional"
          placeholderTextColor="#6b7280"
          value={form.full_name}
          onChangeText={(v) => onChange("full_name", v)}
        />

        <Text style={styles.label}>Contrasena</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => onChange("password", v)}
        />

        <Text style={styles.label}>Confirmar contrasena</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          placeholderTextColor="#6b7280"
          secureTextEntry
          value={form.password2}
          onChangeText={(v) => onChange("password2", v)}
        />

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
