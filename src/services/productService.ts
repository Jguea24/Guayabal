import { api } from "./api";

type CategoryFilter = string | number | undefined;

export const getProductsService = async (category?: CategoryFilter) => {
  const params: Record<string, string | number> = {};

  if (typeof category === "number") {
    if (category !== 0) params.category_id = category;
  } else if (
    category &&
    category.toLowerCase() !== "todos" &&
    category.toLowerCase() !== "all" &&
    category !== "0"
  ) {
    params.category = category;
  }

  const response = await api.get("products/", { params });
  return response.data;
};
