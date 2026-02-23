import { api } from "./api";
import { Category } from "../model/Category";

export const getCategoriesService = async (): Promise<Category[]> => {
  const response = await api.get("categories/");
  return response.data;
};
