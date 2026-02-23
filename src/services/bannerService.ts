import { api } from "./api";
import { Banner } from "../model/Banner";

export const getBannersService = async (): Promise<Banner[]> => {
  const response = await api.get("banners/");
  return response.data;
};
