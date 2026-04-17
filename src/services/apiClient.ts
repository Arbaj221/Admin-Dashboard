import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

/**
 * Create Axios Instance
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
    },
});

/**
 * Request Interceptor
 * - Attach token
 * - Attach custom headers (future: tenant, locale, etc.)
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Handle global errors
 * - Normalize error response
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError<any>) => {
        const status = error.response?.status;

        // 🔹 Normalize error object
        const normalizedError = {
            message:
                error.response?.data?.message ||
                error.message ||
                "Something went wrong",
            status: status || 0,
            data: error.response?.data || null,
        };

        // 🔥 Global Error Handling Strategy
        switch (status) {
            case 401:
                // TODO: Add refresh token logic later
                // For now: clear session
                localStorage.removeItem("access_token");
                // Optional: redirect (handled outside ideally)
                break;

            case 403:
                console.warn("Forbidden: You don’t have permission.");
                break;

            case 404:
                console.warn("Resource not found.");
                break;

            case 500:
                console.error("Server error. Please try again later.");
                break;

            default:
                if (!status) {
                    console.error("Network error / Server unreachable");
                }
                break;
        }

        return Promise.reject(normalizedError);
    }
);

export default apiClient;