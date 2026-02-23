import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#0f7b74",
  },

  container: {
    flex: 1,
    backgroundColor: "#e9f4f2",
    padding: 20,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginTop: 12,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  timeLabel: {
    fontSize: 12,
    color: "#9db7b3",
  },

  greetingLabel: {
    fontSize: 13,
    color: "#9db7b3",
  },

  greetingName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f1d1b",
  },

  statusText: {
    fontSize: 12,
    color: "#9db7b3",
  },

  topActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#0f7b74",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  avatarText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  searchButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  searchButtonIcon: {
    fontSize: 16,
  },

  menuButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#0f1d1b",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  menuIcon: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  searchInputWrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#c9e3df",
  },

  searchIcon: {
    marginRight: 8,
    fontSize: 16,
    color: "#8ca7a3",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f1d1b",
  },

  filterButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#0f7b74",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  filterIcon: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  cartButton: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  cartIcon: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  header: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f2933",
  },

  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 20,
    elevation: 4,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },

  description: {
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginBottom: 20,
  },

  /* ========================= */
  /* 🔽 ESTILOS QUE FALTABAN */
  /* ========================= */

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f1d1b",
  },

  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },

  seeAll: {
    color: "#0f7b74",
    fontWeight: "600",
  },

  error: {
    color: "#dc2626",
    marginBottom: 10,
    textAlign: "center",
  },

  productCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },

  /* ========================= */

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  actionCard: {
    backgroundColor: "#f1f5f9",
    width: "48%",
    padding: 16,
    borderRadius: 10,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2933",
    marginBottom: 4,
  },

  actionText: {
    fontSize: 13,
    color: "#6b7280",
  },

  logoutButton: {
    backgroundColor: "#dc2626",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },

  logoutText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* =========================*/
  /* 🔼 Boton de Carrito */

  addButton: {
  backgroundColor: "#2563eb",
  paddingVertical: 10,
  borderRadius: 8,
  marginTop: 10,
  alignItems: "center",
},

addButtonText: {
  color: "#ffffff",
  fontSize: 14,
  fontWeight: "600",
},

success: {
  color: "#16a34a",
  textAlign: "center",
  marginBottom: 8,
},

/* =========================*/
/* 🔼 Estilos del Grid de Productos */

headerRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

logoutMini: {
  color: "#dc2626",
  fontWeight: "600",
},

banner: {
  backgroundColor: "#facc15",
  padding: 16,
  borderRadius: 14,
  marginVertical: 16,
},

bannerText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#1f2933",
},

  categoryChip: {
    backgroundColor: "#d8eae7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    marginRight: 12,
  },

  categoryActive: {
    backgroundColor: "#0f7b74",
  },

  categoryText: {
    color: "#0f1d1b",
    fontWeight: "500",
  },

  categoryTextActive: {
    color: "#ffffff",
  },

  categoriesRow: {
    marginBottom: 12,
  },

  productGridCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  productImageWrapper: {
    backgroundColor: "#f1f6f5",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  productImage: {
    width: 90,
    height: 110,
    resizeMode: "contain",
  },

  productPrice: {
    fontWeight: "800",
    marginRight: 8,
    color: "#0f7b74",
  },

  oldPrice: {
    color: "#9ca3af",
    textDecorationLine: "line-through",
    marginBottom: 6,
  },

  productMeta: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  addButton: {
    backgroundColor: "#0f7b74",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  heroCard: {
    backgroundColor: "#c1e7df",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },

  heroTitle: {
    color: "#0f1d1b",
    fontSize: 18,
    fontWeight: "800",
  },

  heroSubtitle: {
    color: "#0f1d1b",
    fontSize: 14,
    marginBottom: 8,
  },

  heroCta: {
    backgroundColor: "#0f7b74",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  heroCtaText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  heroImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bedad4",
    marginHorizontal: 4,
  },

  dotActive: {
    backgroundColor: "#0f7b74",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  bottomItem: {
    alignItems: "center",
  },

  bottomIcon: {
    fontSize: 18,
  },

  bottomLabel: {
    fontSize: 11,
    color: "#0f1d1b",
    marginTop: 2,
  },

/* ========================= */
/*   WELCOME / ONBOARDING   */
/* ========================= */

welcomeContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

welcomeLogo: {
  width: 140,
  height: 140,
  resizeMode: "contain",
  marginBottom: 24,
},

welcomeTitle: {
  fontSize: 30,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 8,
  textAlign: "center",
},

welcomeSubtitle: {
  fontSize: 15,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 40,
  paddingHorizontal: 10,
},

welcomeButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  elevation: 6,
},

welcomeButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

welcomeFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},

/* ========================= */
/*     PERMISSIONS SCREEN   */
/* ========================= */

permissionsContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

permissionsIcon: {
  width: 110,
  height: 110,
  resizeMode: "contain",
  marginBottom: 20,
},

permissionsTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 16,
  textAlign: "center",
},

permissionsCard: {
  backgroundColor: "#020617",
  borderRadius: 14,
  padding: 20,
  marginBottom: 30,
},

permissionsText: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 10,
  lineHeight: 20,
},

permissionsButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  elevation: 6,
},

permissionsButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

permissionsFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},

/* ========================= */
/*     BENEFITS SCREEN      */
/* ========================= */

benefitsContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  padding: 24,
},

benefitsTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  textAlign: "center",
  marginTop: 20,
},

benefitsSubtitle: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 30,
},

benefitsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

benefitCard: {
  width: "48%",
  backgroundColor: "#020617",
  borderRadius: 16,
  padding: 16,
  marginBottom: 16,
  alignItems: "center",
},

benefitIcon: {
  width: 48,
  height: 48,
  resizeMode: "contain",
  marginBottom: 10,
},

benefitTitle: {
  fontSize: 15,
  fontWeight: "700",
  color: "#ffffff",
  marginBottom: 6,
  textAlign: "center",
},

benefitText: {
  fontSize: 13,
  color: "#cbd5e1",
  textAlign: "center",
},

benefitsButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  borderRadius: 14,
  alignItems: "center",
  marginTop: 10,
},

benefitsButtonText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

/* ========================= */
/*       ACCESS SCREEN      */
/* ========================= */

accessContainer: {
  flex: 1,
  backgroundColor: "#0f172a",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
},

accessLogo: {
  width: 120,
  height: 120,
  resizeMode: "contain",
  marginBottom: 20,
},

accessTitle: {
  fontSize: 26,
  fontWeight: "800",
  color: "#ffffff",
  marginBottom: 6,
},

accessSubtitle: {
  fontSize: 14,
  color: "#cbd5e1",
  textAlign: "center",
  marginBottom: 36,
},

accessPrimaryButton: {
  backgroundColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  width: "100%",
  alignItems: "center",
  marginBottom: 14,
},

accessPrimaryText: {
  color: "#ffffff",
  fontSize: 16,
  fontWeight: "700",
},

accessSecondaryButton: {
  borderWidth: 1,
  borderColor: "#dc2626",
  paddingVertical: 16,
  paddingHorizontal: 40,
  borderRadius: 14,
  width: "100%",
  alignItems: "center",
},

accessSecondaryText: {
  color: "#dc2626",
  fontSize: 16,
  fontWeight: "700",
},

accessFooter: {
  position: "absolute",
  bottom: 20,
  fontSize: 12,
  color: "#94a3b8",
},



});
