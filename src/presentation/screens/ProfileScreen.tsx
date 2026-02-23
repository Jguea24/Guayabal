import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  getUserProfile,
  getUsername,
  removeToken,
} from "../../shared/storage/authStorage";
import { useProfileViewModel } from "../../viewmodel/ProfileViewModel";
import { profileStyles as styles } from "../styles/profile.styles";

export function ProfileScreen({ navigation }: any) {
  const { profile, loading, error, reload } = useProfileViewModel();
  const [cachedProfile, setCachedProfile] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile().then(setCachedProfile);
    getUsername().then(setUsername);
  }, []);

  const logout = async () => {
    await removeToken();
    navigation.replace("Auth");
  };

  const displayProfile = useMemo(() => {
    const api = profile || {};
    const cached = cachedProfile || {};
    const pick = (...vals: any[]) =>
      vals.find(
        (v) =>
          v !== undefined &&
          v !== null &&
          String(v).trim().length > 0
      );

    return {
      full_name: pick(
        api.full_name,
        api.name,
        api.username,
        cached.full_name,
        cached.name,
        cached.username
      ),
      email: pick(api.email, cached.email),
      phone: pick(
        api.phone,
        api.phone_number,
        cached.phone,
        cached.phone_number
      ),
      address: pick(
        api.address,
        api.main_address,
        cached.address,
        cached.main_address
      ),
      role: pick(api.role, api.user_type, cached.role),
      role_reason: pick(api.role_reason, cached.role_reason),
    };
  }, [profile, cachedProfile]);

  const roleLabel = useMemo(() => {
    const roleRaw = displayProfile.role || "";
    const key = String(roleRaw).toLowerCase();
    const map: Record<string, string> = {
      client: "Cliente",
      driver: "Driver",
      provider: "Proveedor",
    };
    return map[key] || roleRaw;
  }, [displayProfile.role]);

  const valueOrDash = (val?: string | null) =>
    val && String(val).trim().length ? String(val) : "No disponible";

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Perfil</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(displayProfile.full_name || username || "G")
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nameText}>
            {valueOrDash(displayProfile.full_name || username)}
          </Text>
          <Text style={styles.roleText}>{valueOrDash(roleLabel)}</Text>

          <View style={styles.divider} />

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Correo</Text>
            <Text style={styles.fieldValue}>
              {valueOrDash(displayProfile.email)}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Telefono</Text>
            <Text style={styles.fieldValue}>
              {valueOrDash(displayProfile.phone)}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Direccion</Text>
            <Text style={styles.fieldValue}>
              {valueOrDash(displayProfile.address)}
            </Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>Motivo rol</Text>
            <Text style={styles.fieldValue}>
              {valueOrDash(displayProfile.role_reason)}
            </Text>
          </View>
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#fff7f1" />
            <Text style={styles.loadingText}>Cargando perfil...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorRow}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
