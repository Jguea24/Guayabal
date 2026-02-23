import { api } from "./api";

export const addToCartService = async (productId: number, quantity = 1) => {
  const response = await api.post("/cart/", { product: productId, quantity });
  return response.data;
};

export const getCartService = async () => {
  const response = await api.get("/cart/");
  return response.data;
};

export const updateCartItemService = async (body: {
  cart_item_id?: number;
  product?: number;
  quantity: number;
}) => {
  const response = await api.patch("/cart/", body);
  return response.data;
};

export const deleteCartItemService = async (body: {
  cart_item_id?: number;
  product?: number;
}) => {
  const response = await api.delete("/cart/", { data: body });
  return response.data;
};
