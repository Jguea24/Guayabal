import { api } from "./api";

export const createRoleRequestService = async (
  requested_role: "driver" | "provider",
  reason?: string
) => {
  const response = await api.post("/role-requests/", {
    requested_role,
    reason,
  });
  return response.data;
};
