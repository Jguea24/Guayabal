import React, { useEffect, useState } from "react";
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
import { loginStyles as styles } from "../styles/login.styles";

export function LoginScreen({ navigation, route }: any) {
  const { login, loading, error } = useAuthViewModel();
  const presetId = route?.params?.presetId ?? "";

  const [identifier, setIdentifier] = useState(presetId);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIdentifier(presetId);
  }, [presetId]);

  const handleLogin = async () => {
    const success = await login(identifier.trim(), password);
    if (success) navigation.replace("Home");
  };

  const isValid = identifier.trim().length > 0 && password.length > 0;

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
        <Text style={styles.title}>Inicia sesion</Text>
        <Text style={styles.subtitle}>Accede con tu email o telefono</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Email o telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@ejemplo.com / 09xxxxxxxx"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
        />

        <Text style={styles.label}>Contrasena</Text>
        <View style={styles.passwordRow}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="********"
            placeholderTextColor="#6b7280"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
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

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[
            styles.button,
            (!isValid || loading) && styles.buttonDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar sesion</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>
            No tienes cuenta?{" "}
            <Text style={styles.linkTextBold}>Registrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
