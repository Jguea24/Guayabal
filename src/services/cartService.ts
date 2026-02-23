import { api } from "./api";

export const addToCartService = async (
  productId: number,
  token: string,
  quantity = 1
) => {
  const response = await api.post(
    "cart/",
    { product: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
