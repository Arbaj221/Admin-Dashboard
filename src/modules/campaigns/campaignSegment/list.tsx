import { useEffect, useState } from "react";

import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";
import CampSegmentTable from "./components/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";

import { campaignService } from "../manageCampaigns/services/campaignService";
import { Button } from "src/components/ui/button";
import Can from "src/permissions/Can";

const CampaignSegmentList = () => {
    const [addTrigger, setAddTrigger] = useState(0);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | undefined>();
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { title: 'Campaign Segment' },
    ];

    const loadCampaigns = async () => {
        try {
            const data = await campaignService.getCampaigns();
            const list = data || [];

            setCampaigns(list);

            // ✅ AUTO SELECT FIRST CAMPAIGN
            if (list.length > 0) {
                setSelectedCampaignId(list[0].id);
                setSelectedCampaign(list[0]);
            }

        } catch {
            setCampaigns([]);
        }
    };

    useEffect(() => {
        loadCampaigns();
    }, []);

    return (
        <>
            <SlimBreadcrumb title="Campaigns" items={BCrumb} />

            <CardBox>

                <div className="flex justify-between items-center">
                    <div className="max-w-sm">
                        <Select
                            value={selectedCampaignId ? String(selectedCampaignId) : ''}
                            onValueChange={(v) => {
                                const id = Number(v);
                                setSelectedCampaignId(id);

                                const c = campaigns.find((c) => c.id === id);
                                setSelectedCampaign(c);
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Campaign" />
                            </SelectTrigger>

                            <SelectContent>
                                {campaigns.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.code} - {c.campaign_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Can module="campaign_segment" action="create">
                        <Button
                            variant="lightprimary"
                            disabled={!selectedCampaignId}
                            onClick={() => setAddTrigger((v) => v + 1)}
                        >
                            Add Segment
                        </Button>
                    </Can>
                </div>

                {/* ✅ Campaign Reference */}
                {selectedCampaign && (
                    <div className="mt-4 p-3 border rounded-md bg-muted/30 text-sm space-y-2">
                        <div className="font-semibold">
                            {selectedCampaign.code} - {selectedCampaign.campaign_name}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div><strong>Start:</strong> {selectedCampaign.start_date}</div>
                            <div><strong>End:</strong> {selectedCampaign.end_date}</div>
                            <div><strong>Allocation:</strong> {selectedCampaign.total_allocation}</div>
                            <div><strong>Delivered:</strong> {selectedCampaign.total_delivered}</div>
                            <div><strong>Accepted:</strong> {selectedCampaign.total_accepted}</div>
                            <div><strong>Rejected:</strong> {selectedCampaign.total_rejected}</div>
                        </div>
                    </div>
                )}

                <CampSegmentTable addTrigger={addTrigger}
                    campaignId={selectedCampaignId} />

            </CardBox>
        </>
    );
};

export default CampaignSegmentList;