import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { clearTokens } from "../../services/api";
import { getUsername } from "../../shared/storage/authStorage";
import { useProductViewModel } from "../../viewmodel/ProductViewModel";
import { useCartViewModel } from "../../viewmodel/CartViewModel";
import { useCategoryViewModel } from "../../viewmodel/CategoryViewModel";
import { useBannerViewModel } from "../../viewmodel/BannerViewModel";
import { homeStyles as styles } from "../styles/home.styles";

const CATEGORY_ICONS: Record<string, any> = {
  whisky: require("../../shared/assets/bottle.png"),
  vodka: require("../../shared/assets/bottle.png"),
  ron: require("../../shared/assets/bottle.png"),
  tequila: require("../../shared/assets/bottle.png"),
  cerveza: require("../../shared/assets/bottle.png"),
  vino: require("../../shared/assets/bottle.png"),
};

type CategoryOption = {
  label: string;
  value: string | number;
  imageUrl?: string | null;
  fallbackKey?: string | null;
};

const fallbackCategories: CategoryOption[] = [
  {
    label: "Todo",
    value: "all",
    imageUrl: null,
    fallbackKey: "all",
  },
];

const fallbackHeroCards = [
  {
    title: "Descuento 30%",
    subtitle: "En bebidas seleccionadas",
    cta_text: "Ver ofertas",
  },
];

const bottomNavItems = [
  { label: "Inicio", icon: "⌂", active: true },
  { label: "Buscar", icon: "⌕" },
  {
    label: "Carrito",
    image: require("../../shared/assets/cart.png"),
  },
  { label: "Favoritos", icon: "♡" },
  { label: "Perfil", icon: "◉", route: "Profile" },
];

export function HomeScreen({ navigation }: any) {
  const [username, setUsername] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption>(fallbackCategories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeHero, setActiveHero] = useState(0);

  const { width } = useWindowDimensions();
  const heroWidth = Math.max(280, width - 40);

  const { products, loading, error } = useProductViewModel(
    selectedCategory.value
  );
  const { addToCart, loading: cartLoading } = useCartViewModel();
  const { categories, loading: categoriesLoading } = useCategoryViewModel();
  const { banners } = useBannerViewModel();

  useEffect(() => {
    getUsername().then(setUsername);
  }, []);

  const logout = async () => {
    await clearTokens();
    navigation.replace("Auth");
  };

  const confirmLogout = () => {
    Alert.alert(
      "Cerrar sesion",
      "Estas seguro de que deseas cerrar sesion?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar sesion", style: "destructive", onPress: logout },
      ]
    );
  };

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return products;

    return products.filter((p) => {
      const name = p.name?.toLowerCase() ?? "";
      const desc = p.description?.toLowerCase() ?? "";
      const category = p.category_name?.toLowerCase() ?? "";
      return (
        name.includes(query) ||
        desc.includes(query) ||
        category.includes(query)
      );
    });
  }, [products, searchTerm]);

  const displayCategories = useMemo<CategoryOption[]>(() => {
    const isAllCategory = (value?: string | null) =>
      !!value &&
      ["all", "todo", "todos"].includes(value.trim().toLowerCase());

    const filtered = categories.filter((c) => {
      const key = (c.slug || c.name || "").toLowerCase();
      return !isAllCategory(key);
    });

    return [
      fallbackCategories[0],
      ...filtered.map((c) => ({
        label: c.name,
        value: c.id,
        imageUrl: c.image_url ?? null,
        fallbackKey: c.slug ?? c.name?.toLowerCase() ?? "",
      })),
    ];
  }, [categories]);

  const displayBanners = banners.length ? banners : fallbackHeroCards;
  const displayName = username ?? "Invitado";
  const avatarLetter = displayName.trim().charAt(0).toUpperCase() || "G";

  const handleAddToCart = async (productId: number) => {
    const result = await addToCart(productId);

    Alert.alert(
      result.ok ? "Carrito" : "No se pudo agregar",
      result.message
    );
  };

  const handleHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setActiveHero(index);
  };

  return (
    <View style={styles.page}>
      <View pointerEvents="none" style={styles.background}>
        <View style={styles.blob} />
        <View style={styles.blobAlt} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.tag}>GUAYABAL</Text>
            <Text style={styles.greetingLabel}>Hola,</Text>
            <Text style={styles.greetingName}>{displayName}</Text>
            <Text style={styles.statusText}>Que tomamos hoy</Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.avatarText}>{avatarLetter}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={confirmLogout}
            >
              <Text style={styles.menuIcon}>SALIR</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar productos"
              placeholderTextColor="#9b8b7b"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>Filtros</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleHeroScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.heroRow}
        >
          {displayBanners.map((card, idx) => (
            <View
              key={card.title ?? card.subtitle ?? idx}
              style={[styles.heroCard, { width: heroWidth }]}
            >
              <View style={styles.heroContent}>
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>OFERTA</Text>
                </View>
                <Text style={styles.heroTitle}>
                  {card.title ?? "Especial para ti"}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {card.subtitle ?? "Bebidas premium"}
                </Text>
                <TouchableOpacity style={styles.heroCta}>
                  <Text style={styles.heroCtaText}>
                    {card.cta_text ?? "Comprar"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={
                  (card as any).image_url
                    ? { uri: (card as any).image_url }
                    : require("../../shared/assets/offer.png")
                }
                style={styles.heroImage}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.dotsRow}>
          {displayBanners.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, activeHero === idx && styles.dotActive]}
            />
          ))}
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Image
              source={require("../../shared/assets/clock.png")}
              style={styles.statIcon}
            />
            <View>
              <Text style={styles.statTitle}>Entrega rapida</Text>
              <Text style={styles.statSubtitle}>30-45 min</Text>
            </View>
          </View>
          <View style={styles.statCard}>
            <Image
              source={require("../../shared/assets/shield.png")}
              style={styles.statIcon}
            />
            <View>
              <Text style={styles.statTitle}>Pago seguro</Text>
              <Text style={styles.statSubtitle}>Protegido</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Compra por categoria</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Todas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
        >
          {categoriesLoading && (
            <View style={[styles.categoryChip, { opacity: 0.6 }]}> 
              <Text style={styles.categoryText}>Cargando...</Text>
            </View>
          )}
          {displayCategories.map((cat) => {
            const key = (cat.fallbackKey || "").toLowerCase();
            const iconSource =
              cat.imageUrl
                ? { uri: cat.imageUrl }
                : CATEGORY_ICONS[key] || require("../../shared/assets/bottle.png");

            return (
              <TouchableOpacity
                key={cat.value}
                style={styles.categoryChip}
                onPress={() => setSelectedCategory(cat)}
              >
                <View
                  style={[
                    styles.categoryIconWrap,
                    selectedCategory.value === cat.value &&
                      styles.categoryActive,
                  ]}
                >
                  <Image
                    source={iconSource}
                    style={styles.categoryIcon}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory.value === cat.value &&
                      styles.categoryTextActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Recomendados</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#16a34a"
            style={{ marginTop: 20 }}
          />
        )}

        {error && <Text style={styles.error}>{error}</Text>}

        <FlatList
          data={filteredProducts}
          numColumns={2}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ marginTop: 6, paddingBottom: 24 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <View style={styles.productGridCard}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("ProductDetail", { product: item })
                }
              >
                <View style={styles.productImageWrapper}>
                  {item.old_price ? (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>OFERTA</Text>
                    </View>
                  ) : null}
                  <Image
                    source={
                      item.image_url
                        ? { uri: item.image_url }
                        : require("../../shared/assets/bottle.png")
                    }
                    style={styles.productImage}
                  />
                </View>

                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.productMeta} numberOfLines={1}>
                  {item.description ?? "Bebida premium"}
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>
                    ${item.price?.toFixed ? item.price.toFixed(2) : item.price}
                  </Text>
                  {item.old_price ? (
                    <Text style={styles.oldPrice}>
                      $
                      {item.old_price?.toFixed
                        ? item.old_price.toFixed(2)
                        : item.old_price}
                    </Text>
                  ) : null}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.addButton,
                  cartLoading && styles.addButtonDisabled,
                ]}
                onPress={() => handleAddToCart(item.id)}
                disabled={cartLoading}
              >
                <Text style={styles.addButtonText}>
                  {cartLoading ? "Agregando..." : "Agregar"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.bottomNav}>
        {bottomNavItems.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.bottomItem}
            onPress={() => {
              if (item.route) navigation.navigate(item.route);
            }}
          >
            <View
              style={[
                styles.bottomIconWrap,
                item.active && styles.bottomIconWrapActive,
              ]}
            >
              {item.image ? (
                <Image source={item.image} style={styles.bottomIconImage} />
              ) : (
                <Text
                  style={[
                    styles.bottomIconText,
                    item.active && styles.bottomIconTextActive,
                  ]}
                >
                  {item.icon}
                </Text>
              )}
            </View>
            <Text
              style={[
                styles.bottomLabel,
                item.active && styles.bottomLabelActive,
              ]}
            >
              {item.label}
            </Text>
            <View
              style={[
                styles.bottomDot,
                item.active && styles.bottomDotActive,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
