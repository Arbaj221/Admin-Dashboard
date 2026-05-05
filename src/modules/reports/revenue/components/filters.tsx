import { useState } from "react";
import MultiSelect from "src/components/ui/Multiselect"; // your component

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";

import { CAMPAIGN_STATUS_OPTIONS } from "src/config/constant-data/campaignOptions";
import { Button } from "src/components/ui/button";
import { Download, Filter } from "lucide-react";
interface Props {
    campaigns: { label: string; value: string }[];

    onApply: (filters: {
        campaign_code?: string;
        status?: string;
        date?: string;
    }) => void;

    onDownload: (filters: {
        campaign_code?: string;
        status?: string;
        date?: string;
    }) => void;

    downloading: boolean;
}

const RevenueFilters = ({ campaigns, onApply, onDownload, downloading }: Props) => {
    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState("");

    const handleApply = () => {
        onApply({
            campaign_code: selectedCampaigns.length
                ? selectedCampaigns.join(",")
                : undefined,
            status: status !== "all" ? status : undefined,
            date: date || undefined,
        });
    };

    const handleDownload = () => {
        onDownload({
            campaign_code: selectedCampaigns.length
                ? selectedCampaigns.join(",")
                : undefined,
            status: status !== "all" ? status : undefined,
            date: date || undefined,
        });
    };

    return (
        <div className="flex items-center gap-4 mb-4">

            {/* STATUS */}
            <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {CAMPAIGN_STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                            {s.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* CAMPAIGN MULTISELECT */}
            <div className="w-64">
                <MultiSelect
                    options={campaigns}
                    value={selectedCampaigns}
                    onChange={setSelectedCampaigns}
                    placeholder="Select Campaign"
                />
            </div>

            {/* DATE */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-10 px-3 border border-input rounded-md"
            />

            {/* BUTTONS */}
            <div className="ml-auto flex gap-2">

                {/* APPLY */}
                <Button
                    variant="lightprimary"
                    onClick={handleApply}
                    className="flex items-center gap-2"
                >
                    <Filter size={16} />
                    Apply
                </Button>

                {/* DOWNLOAD */}
                <Button
                    variant="lightprimary"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2"
                >
                    <Download size={16} />
                    {downloading ? "Downloading..." : "Download"}
                </Button>

            </div>

        </div>
    );
};

export default RevenueFilters;