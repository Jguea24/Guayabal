import { StyleSheet } from "react-native";

export const profileStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#1b0f14",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: "#fff7f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e8cdbd",
  },
  backText: {
    color: "#7a1f2b",
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    color: "#fff7f1",
    fontWeight: "700",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#fff7f1",
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e8cdbd",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#7a1f2b",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#fff7f1",
    fontWeight: "800",
    fontSize: 22,
  },
  nameText: {
    color: "#3b141c",
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
  },
  roleText: {
    color: "#7b6a5b",
    textAlign: "center",
    marginTop: 2,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#edd9c9",
    marginBottom: 12,
  },
  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  loadingText: {
    color: "#fff7f1",
    marginLeft: 8,
    fontSize: 12,
  },
  errorRow: {
    marginTop: 12,
    alignItems: "center",
  },
  errorText: {
    color: "#f87171",
    fontWeight: "600",
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: "#fff7f1",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e8cdbd",
  },
  retryText: {
    color: "#7a1f2b",
    fontWeight: "700",
    fontSize: 12,
  },
  fieldRow: {
    marginBottom: 12,
  },
  fieldLabel: {
    color: "#7b6a5b",
    fontSize: 12,
  },
  fieldValue: {
    color: "#3b141c",
    fontWeight: "600",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#7a1f2b",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  logoutText: {
    color: "#fff7f1",
    fontWeight: "700",
  },
});
