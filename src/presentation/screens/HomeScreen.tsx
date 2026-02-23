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
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { getUsername, removeToken } from "../../shared/storage/authStorage";
import { useProductViewModel } from "../../viewmodel/ProductViewModel";
import { useCartViewModel } from "../../viewmodel/CartViewModel";
import { useCategoryViewModel } from "../../viewmodel/CategoryViewModel";
import { useBannerViewModel } from "../../viewmodel/BannerViewModel";
import { homeStyles as styles } from "../styles/home.styles";

type CategoryOption = { label: string; value: string | number };

const fallbackCategories: CategoryOption[] = [{ label: "All", value: "all" }];
const fallbackHeroCards = [
  { title: "Discount 30%", subtitle: "All Coffee", cta_text: "Shop now" },
];

export function HomeScreen({ navigation }: any) {
  const [username, setUsername] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption>(fallbackCategories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeHero, setActiveHero] = useState(0);

  const { products, loading, error } = useProductViewModel(
    selectedCategory.value
  );
  const { addToCart } = useCartViewModel();
  const { categories, loading: categoriesLoading } = useCategoryViewModel();
  const { banners, loading: bannersLoading } = useBannerViewModel();

  useEffect(() => {
    getUsername().then(setUsername);
  }, []);

  const logout = async () => {
    await removeToken();
    navigation.replace("Auth");
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  const displayCategories = useMemo<CategoryOption[]>(
    () => [
      fallbackCategories[0],
      ...categories.map((c) => ({ label: c.name, value: c.id })),
    ],
    [categories]
  );

  const displayBanners = banners.length ? banners : fallbackHeroCards;

  const handleHeroScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    const index = Math.round(contentOffset.x / layoutMeasurement.width);
    setActiveHero(index);
  };

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.timeLabel}>09:46</Text>
            <Text style={styles.greetingLabel}>Hi,</Text>
            <Text style={styles.greetingName}>{username ?? "Badium"}</Text>
            <Text style={styles.statusText}>Morning, enjoy.</Text>
          </View>
          <View style={styles.topActions}>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(username ?? "B")[0]?.toUpperCase()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={logout}>
              <Text style={styles.menuIcon}>≡</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search here..."
              placeholderTextColor="#9db7b3"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>⚙︎</Text>
          </TouchableOpacity>
        </View>

        {/* Hero carousel */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleHeroScroll}
          scrollEventThrottle={16}
        >
          {displayBanners.map((card, idx) => (
            <View
              key={card.title ?? card.subtitle ?? idx}
              style={styles.heroCard}
            >
              <View>
                <Text style={styles.heroTitle}>
                  {card.title ?? "Special for you"}
                </Text>
                <Text style={styles.heroSubtitle}>
                  {card.subtitle ?? "Best drinks today"}
                </Text>
                <TouchableOpacity style={styles.heroCta}>
                  <Text style={styles.heroCtaText}>
                    {card.cta_text ?? "Shop now"}
                  </Text>
                </TouchableOpacity>
              </View>
              <Image
                source={
                  (card as any).image_url
                    ? { uri: (card as any).image_url }
                    : require("../../shared/assets/bottle.png")
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
              style={[
                styles.dot,
                activeHero === idx && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesRow}
        >
          {categoriesLoading && (
            <View style={[styles.categoryChip, { opacity: 0.6 }]}>
              <Text style={styles.categoryText}>Loading…</Text>
            </View>
          )}
          {displayCategories.map((cat) => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.categoryChip,
                selectedCategory.value === cat.value && styles.categoryActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
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
          ))}
        </ScrollView>

        {/* Recommendations */}
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Recommendation</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Products */}
        {loading && (
          <ActivityIndicator
            size="large"
            color="#0f7b74"
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
              <View style={styles.productImageWrapper}>
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
                {item.description ?? "Coffee size M"}
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

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item.id)}
              >
                <Text style={styles.addButtonText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {[
          { icon: "🏠", label: "Home" },
          { icon: "💬", label: "Chat" },
          { icon: "🛒", label: "Cart" },
          { icon: "❤️", label: "Fav" },
          { icon: "👤", label: "Profile" },
        ].map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.bottomItem}>
            <Text style={styles.bottomIcon}>{item.icon}</Text>
            <Text style={styles.bottomLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
