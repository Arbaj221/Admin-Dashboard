import { useState } from "react";

import MultiSelect from "src/components/ui/Multiselect";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";

import { Button } from "src/components/ui/button";

import {
    Download,
    Filter,
    BarChart3,
    RotateCcw,
} from "lucide-react";

import { CAMPAIGN_STATUS_OPTIONS } from "src/config/constant-data/campaignOptions";

interface Props {
    campaigns: { label: string; value: string }[];

    onApply: (filters: {
        campaign_code?: string;
        status?: string;
        date?: string;
    }) => void;

    onOpenSummary: () => void;

    onDownload: (filters: {
        campaign_code?: string;
        status?: string;
        date?: string;
    }) => void;

    downloading: boolean;

    // ✅ from parent
    hasData: boolean;
}

const RevenueFilters = ({
    campaigns,
    onApply,
    onDownload,
    downloading,
    onOpenSummary,
    hasData,
}: Props) => {

    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState("");

    // ✅ detect filters
    const hasFilters =
        selectedCampaigns.length > 0 ||
        status !== "all" ||
        !!date;

    // ✅ apply
    const handleApply = () => {
        onApply({
            campaign_code: selectedCampaigns.length
                ? selectedCampaigns.join(",")
                : undefined,

            status:
                status !== "all"
                    ? status
                    : undefined,

            date: date || undefined,
        });
    };

    // ✅ download
    const handleDownload = () => {
        onDownload({
            campaign_code: selectedCampaigns.length
                ? selectedCampaigns.join(",")
                : undefined,

            status:
                status !== "all"
                    ? status
                    : undefined,

            date: date || undefined,
        });
    };

    // ✅ reset
    const handleReset = () => {
        setSelectedCampaigns([]);
        setStatus("all");
        setDate("");

        // reload all data
        onApply({});
    };

    return (
        <div className="flex items-center gap-4 mb-4">

            {/* STATUS */}
            <Select
                value={status}
                onValueChange={setStatus}
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All
                    </SelectItem>

                    {CAMPAIGN_STATUS_OPTIONS.map((s) => (
                        <SelectItem
                            key={s.value}
                            value={s.value}
                        >
                            {s.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* CAMPAIGNS */}
            <div className="w-72">
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
                className="h-10 px-3 border border-input rounded-md bg-background"
            />

            {/* ACTIONS */}
            <div className="ml-auto flex items-center gap-2">

                {/* APPLY */}
                <Button
                    variant="lightprimary"
                    onClick={handleApply}
                    className="flex items-center gap-2"
                >
                    <Filter size={16} />
                    Apply
                </Button>

                {/* RESET */}
                <Button
                    variant="lighterror"
                    onClick={handleReset}
                    disabled={!hasFilters}
                    className="flex items-center gap-2"
                >
                    <RotateCcw size={16} />
                    Reset
                </Button>

                {/* DOWNLOAD */}
                <Button
                    variant="lightprimary"
                    onClick={handleDownload}
                    disabled={downloading || !hasData}
                    className="flex items-center gap-2"
                >
                    <Download size={16} />

                    {downloading
                        ? "Downloading..."
                        : "Download"}
                </Button>

                {/* SUMMARY */}
                <Button
                    variant="lightprimary"
                    onClick={onOpenSummary}
                    className="flex items-center gap-2"
                >
                    <BarChart3 size={16} />
                    Summary
                </Button>

            </div>
        </div>
    );
};

export default RevenueFilters;