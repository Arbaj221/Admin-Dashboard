import apiClient from 'src/services/apiClient';

export interface Campaign {
    id: number;
    code: string;
    campaign_name: string;
    campaign_type: string;
    delivery_mode: string;
    delivery_method: string;
    client_id: number;
    status: string;

    start_date: string;
    end_date: string;

    total_allocation: number;
    total_delivered: number;
    total_accepted: number;
    total_rejected: number;

    currency: string;
    cpl: number;
    priority: string;

    campaign_document_name: string;
    comment: string;
}


export const campaignSegmentService = {

    async getSegmentsByCampaignId(id: number) {
        const res = await apiClient.get(`/segments/${id}`);
        return res.data;
    },

    async createSegment(payload: any) {
        return (await apiClient.post('/segments/', payload)).data;
    },

    async updateSegment(id: number, payload: any) {
        return (await apiClient.patch(`/segments/${id}`, payload)).data;
    },

    async deleteSegment(id: number) {
        return (await apiClient.delete(`/segments/${id}`)).data;
    },
};