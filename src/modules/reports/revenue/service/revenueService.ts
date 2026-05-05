import apiClient from "src/services/apiClient";

export const revenueService = {
    async getRevenue(params: any) {
        const res = await apiClient.get("/revenue", { params });
        return res.data;
    },

    async downloadRevenue(params: any) {
        const res = await apiClient.get("/revenue/download", {
            params,
            responseType: "blob",
        });
        return res;
    }
};