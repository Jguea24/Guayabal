import { api } from "./api";

export const geoAutocompleteService = async (
  q: string,
  country = "ec"
) => {
  const response = await api.get("/geo/autocomplete/", {
    params: { q, country },
  });
  return response.data;
};

export const geoGeocodeService = async (params: {
  place_id?: string;
  q?: string;
  lat?: number;
  lng?: number;
  country?: string;
}) => {
  const response = await api.get("/geo/geocode/", { params });
  return response.data;
};
