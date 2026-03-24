import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
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
    if (success) {
      Alert.alert("Exito", "Inicio de sesion correcto.", [
        {
          text: "OK",
          onPress: () => navigation.replace("Home"),
        },
      ]);
    }
  };

  const isValid = identifier.trim().length > 0 && password.length > 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.background}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />
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

        <Text style={styles.title}>Iniciar sesion</Text>
        <Text style={styles.helper}>Ingresa con tu correo o telefono.</Text>

        <View style={styles.inputRow}>
          <View style={styles.inputIcon}>
            <Text style={styles.inputIconText}>@</Text>
          </View>
          <TextInput
            style={styles.inputField}
            placeholder="Correo o telefono"
            placeholderTextColor="#9b8b7b"
            autoCapitalize="none"
            value={identifier}
            onChangeText={setIdentifier}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.inputIcon}>
            <Text style={styles.inputIconText}>*</Text>
          </View>
          <TextInput
            style={styles.inputField}
            placeholder="Contrasena"
            placeholderTextColor="#9b8b7b"
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
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={styles.linkContainer}
        >
          <Text style={styles.linkText}>Crear cuenta nueva</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
