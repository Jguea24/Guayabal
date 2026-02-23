import { api } from "./api";

export const createOrderService = async (delivery_address?: number) => {
  const body = delivery_address ? { delivery_address } : {};
  const response = await api.post("/orders/", body);
  return response.data;
};

export const listOrdersService = async () => {
  const response = await api.get("/orders/");
  return response.data;
};

export const getOrderService = async (id: number) => {
  const response = await api.get(`/orders/${id}/`);
  return response.data;
};
