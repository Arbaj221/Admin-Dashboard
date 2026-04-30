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

    async getAllCampaignSegment() {
        const res = await apiClient.get(`/campaign-segments/`);
        return res.data;
    },

    async getSegmentsByCampaignId(id: number) {
        const res = await apiClient.get(`/campaign-segments/${id}`);
        return res.data;
    },

    async bulkUpdate(payload: any) {
        return (await apiClient.patch('/campaign-segments/bulk', payload)).data;
    },
};