import axios from 'axios';
import { toast } from 'sonner';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 👉 REQUEST INTERCEPTOR (attach token)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 👉 RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.detail ||
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong';

    const method = error?.config?.method?.toLowerCase();

    // 🚨 401 → logout
    if (status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // ❌ Skip controlled errors (UI will handle)
    if (status === 409 || status === 422) {
      return Promise.reject(error);
    }

    // 🔔 Generic fallback
    if (method !== 'get') {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;