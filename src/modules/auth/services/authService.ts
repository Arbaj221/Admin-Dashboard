import apiClient from "../../../services/apiClient";

interface LoginPayload {
  username: string;
  password: string;
}

export const authService = {
  async login(payload: LoginPayload) {
    const params = new URLSearchParams();
    params.append('username', payload.username);
    params.append('password', payload.password);

    const res = await apiClient.post('/auth/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return res.data;
  },

  logout() {
    localStorage.removeItem('access_token');
  },

  getToken() {
    return localStorage.getItem('access_token');
  },
};