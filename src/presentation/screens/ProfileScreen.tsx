import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { clearTokens, resolveApiUrl } from "../../services/api";
import {
  getUserProfile,
  getUsername,
  ProfileMenuItem,
  ProfileStat,
} from "../../shared/storage/authStorage";
import { useProfileViewModel } from "../../viewmodel/ProfileViewModel";
import {
  getLanguageLabel,
  getMenuItemKey,
  getMenuItemPreferenceKey,
  getProfileMenuSections,
  mergeDisplayProfile,
  valueOrDash,
} from "../../viewmodel/profileLogic";
import { profileStyles as styles } from "../styles/profile.styles";

const BADGE_BY_KEY: Record<string, string> = {
  profile_info: "IP",
  profile_photo: "FP",
  addresses: "MD",
  notifications_enabled: "NT",
  language: "ES",
  dark_mode: "MO",
};

const isToggleKey = (
  key: string | null
): key is "notifications_enabled" | "dark_mode" =>
  key === "notifications_enabled" || key === "dark_mode";

export function ProfileScreen({ navigation }: any) {
  const { profile, loading, saving, error, reload, updateProfile } =
    useProfileViewModel();
  const [cachedProfile, setCachedProfile] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [savingPreference, setSavingPreference] = useState<string | null>(null);

  useEffect(() => {
    getUsername().then(setUsername);
  }, []);

  useEffect(() => {
    getUserProfile().then(setCachedProfile);
  }, [profile]);

  const displayProfile = useMemo(() => {
    return mergeDisplayProfile(profile, cachedProfile);
  }, [profile, cachedProfile]);

  const menuSections = useMemo(() => {
    return getProfileMenuSections(displayProfile);
  }, [displayProfile]);

  const stats = useMemo(() => {
    const statsList = Array.isArray(displayProfile.stats)
      ? displayProfile.stats
      : [];

    return statsList.filter(
      (item: ProfileStat) =>
        item &&
        item.label &&
        item.value !== undefined &&
        item.value !== null &&
        String(item.value).trim().length > 0
    );
  }, [displayProfile.stats]);

  const avatarName = displayProfile.full_name || username || "Guayabal";
  const avatarLetter = avatarName.trim().charAt(0).toUpperCase() || "G";
  const avatarUri = resolveApiUrl(displayProfile.photo_url);

  const logout = async () => {
    await clearTokens();
    navigation.replace("Auth");
  };

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesion",
      "Se cerrara tu sesion actual en el dispositivo.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesion", style: "destructive", onPress: logout },
      ]
    );
  };

  const handleTogglePreference = async (
    key: "notifications_enabled" | "dark_mode",
    value: boolean
  ) => {
    setSavingPreference(key);
    const success = await updateProfile({ [key]: value });
    setSavingPreference(null);

    if (!success) {
      Alert.alert("No se pudo guardar", "Intenta nuevamente.");
    }
  };

  const handleMenuPress = (item: ProfileMenuItem) => {
    const key = getMenuItemKey(item);
    const preferenceKey = getMenuItemPreferenceKey(item);

    if (isToggleKey(preferenceKey)) {
      return;
    }

    if (key === "profile_info") {
      Alert.alert(
        "Informacion del perfil",
        [
          "Nombre: " + valueOrDash(displayProfile.full_name || username),
          "Correo: " + valueOrDash(displayProfile.email),
          "Telefono: " + valueOrDash(displayProfile.phone),
        ].join("\n")
      );
      return;
    }

    if (key === "addresses") {
      Alert.alert(
        "Mis direcciones",
        valueOrDash(displayProfile.address || item.subtitle)
      );
      return;
    }

    if (key === "profile_photo") {
      Alert.alert(
        "Foto de perfil",
        avatarUri
          ? "La foto ya esta configurada. Falta integrar el selector de imagen para reemplazarla."
          : "El backend ya acepta multipart. Falta integrar el selector de imagen en la app."
      );
      return;
    }

    if (preferenceKey === "language") {
      Alert.alert(
        "Idioma",
        "Configurado en " +
          getLanguageLabel(displayProfile.preferences?.language || item.subtitle)
      );
      return;
    }

    Alert.alert(item.title || "Opcion", item.subtitle || "Accion disponible.");
  };

  const renderMenuAction = (item: ProfileMenuItem) => {
    const preferenceKey = getMenuItemPreferenceKey(item);

    if (isToggleKey(preferenceKey)) {
      const currentValue = Boolean(displayProfile.preferences?.[preferenceKey]);
      return (
        <View style={styles.switchWrap}>
          {saving && savingPreference === preferenceKey ? (
            <ActivityIndicator size="small" color="#bf6a25" />
          ) : (
            <Switch
              value={currentValue}
              onValueChange={(value) =>
                handleTogglePreference(preferenceKey, value)
              }
              disabled={saving}
              thumbColor="#fffaf4"
              trackColor={{ false: "#d9d5cf", true: "#bf6a25" }}
            />
          )}
        </View>
      );
    }

    const trailingText =
      preferenceKey === "language"
        ? getLanguageLabel(displayProfile.preferences?.language || item.subtitle)
        : null;

    return (
      <View style={styles.trailingWrap}>
        {trailingText ? (
          <Text style={styles.trailingText}>{trailingText}</Text>
        ) : null}
        <Text style={styles.chevron}>{">"}</Text>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <View pointerEvents="none" style={styles.background}>
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />
      </View>

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
          <Text style={styles.title}>Mi Perfil</Text>
          <TouchableOpacity style={styles.reloadButton} onPress={reload}>
            <Text style={styles.reloadText}>Recargar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroContent}>
            <View style={styles.avatarWrap}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarText}>{avatarLetter}</Text>
                </View>
              )}
            </View>

            <View style={styles.heroTextBlock}>
              <Text style={styles.nameText}>
                {valueOrDash(displayProfile.full_name || username)}
              </Text>
              <Text style={styles.emailText}>
                {valueOrDash(displayProfile.email)}
              </Text>
              <View style={styles.roleChip}>
                <Text style={styles.roleChipText}>
                  Rol: {valueOrDash(displayProfile.role_label)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Telefono</Text>
              <Text style={styles.metaValue}>
                {valueOrDash(displayProfile.phone)}
              </Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Direccion</Text>
              <Text style={styles.metaValue}>
                {valueOrDash(displayProfile.address)}
              </Text>
            </View>
          </View>
        </View>

        {stats.length ? (
          <View style={styles.statsSection}>
            <Text style={styles.sectionTag}>RESUMEN</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {stats.map((item, index) => (
                <View
                  key={item.id || item.label || String(index)}
                  style={styles.statCard}
                >
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                  {item.subtitle ? (
                    <Text style={styles.statSubtitle}>{item.subtitle}</Text>
                  ) : null}
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}

        {loading ? (
          <View style={styles.feedbackRow}>
            <ActivityIndicator color="#fffaf4" />
            <Text style={styles.feedbackText}>Cargando perfil...</Text>
          </View>
        ) : null}

        {error ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <Text style={styles.retryText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {menuSections.map((section, sectionIndex) => (
          <View
            key={section.id || section.title || String(sectionIndex)}
            style={styles.sectionBlock}
          >
            <Text style={styles.sectionTag}>
              {String(section.title || "Seccion").toUpperCase()}
            </Text>
            <View style={styles.menuCard}>
              {(section.items || []).map((item, itemIndex, arr) => {
                const key = getMenuItemKey(item);
                const badge =
                  BADGE_BY_KEY[key] ||
                  String(item.title || "OP")
                    .replace(/[^A-Za-z]/g, "")
                    .slice(0, 2)
                    .toUpperCase() ||
                  "OP";
                const toggleKey = getMenuItemPreferenceKey(item);

                return (
                  <TouchableOpacity
                    key={item.id || item.title || String(itemIndex)}
                    style={[
                      styles.menuRow,
                      itemIndex < arr.length - 1 && styles.menuRowBorder,
                    ]}
                    activeOpacity={isToggleKey(toggleKey) ? 1 : 0.88}
                    onPress={() => handleMenuPress(item)}
                    disabled={isToggleKey(toggleKey)}
                  >
                    <View style={styles.menuBadge}>
                      <Text style={styles.menuBadgeText}>{badge}</Text>
                    </View>

                    <View style={styles.menuTextWrap}>
                      <Text style={styles.menuTitle}>
                        {item.title || "Opcion"}
                      </Text>
                      {item.subtitle ? (
                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                      ) : null}
                    </View>

                    {renderMenuAction(item)}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
