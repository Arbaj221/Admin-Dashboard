import apiClient from "../../../services/apiClient";

interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await apiClient.post("/api/v1/auth/login", payload);
  return res.data;
};