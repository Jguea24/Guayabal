import { api } from "./api";

export type AddressPayload = {
  main_address: string;
  city: string;
  secondary_street?: string;
  apartment?: string;
  delivery_instructions?: string;
  is_default?: boolean;
};

export const createAddressService = async (body: AddressPayload) => {
  const response = await api.post("/addresses/", body);
  return response.data;
};

export const listAddressesService = async () => {
  const response = await api.get("/addresses/");
  return response.data;
};

export const updateAddressService = async (
  id: number,
  body: Partial<AddressPayload>
) => {
  const response = await api.patch(`/addresses/${id}/`, body);
  return response.data;
};

export const deleteAddressService = async (id: number) => {
  const response = await api.delete(`/addresses/${id}/`);
  return response.data;
};
