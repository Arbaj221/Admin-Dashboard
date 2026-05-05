import apiClient from "src/services/apiClient";

export const revenueService = {
    async getRevenue(params?: { campaign_code?: string; status?: string; }) {
        const res = await apiClient.get("/revenue/", { params });
        return res.data;
    },
    async downloadRevenue(params?: {
        campaign_code?: string;
        status?: string;
    }) {
        const res = await apiClient.get("/revenue/download", {
            params,
            responseType: "blob", // 🔥 important
        });

        return res;
    }
};