import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useCartViewModel } from "../../viewmodel/CartViewModel";
import { productDetailStyles as styles } from "../styles/productDetail.styles";

export function ProductDetailScreen({ navigation, route }: any) {
  const { addToCart } = useCartViewModel();
  const product = route?.params?.product;

  if (!product) {
    return (
      <View style={styles.page}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Producto no encontrado</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <View style={styles.headerTag}>
            <Text style={styles.headerTagText}>Detalle</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Image
            source={
              product.image_url
                ? { uri: product.image_url }
                : require("../../shared/assets/bottle.png")
            }
            style={styles.heroImage}
          />
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>
            {product.category_name || "Bebidas"}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ${product.price?.toFixed ? product.price.toFixed(2) : product.price}
            </Text>
            {product.old_price ? (
              <Text style={styles.oldPrice}>
                $
                {product.old_price?.toFixed
                  ? product.old_price.toFixed(2)
                  : product.old_price}
              </Text>
            ) : null}
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Stock</Text>
              <Text style={styles.metaValue}>
                {product.stock ?? 0}
              </Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaLabel}>Rating</Text>
              <Text style={styles.metaValue}>
                {product.rating ?? "-"}
              </Text>
            </View>
            <View style={[styles.metaPill, styles.metaPillLast]}>
              <Text style={styles.metaLabel}>Resenas</Text>
              <Text style={styles.metaValue}>
                {product.reviews_count ?? 0}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Descripcion</Text>
          <Text style={styles.description}>
            {product.description ||
              "Producto premium seleccionado para una experiencia unica."}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addToCart(product.id)}
        >
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
