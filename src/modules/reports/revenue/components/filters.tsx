import { useEffect, useState } from "react";

import { Input } from "src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";

import { CAMPAIGN_STATUS_OPTIONS } from "src/config/constant-data/campaignOptions";
import { revenueService } from "../service/revenueService";
import { Button } from "src/components/ui/button";
import Can from "src/permissions/Can";

interface Props {
    status: string;
    setStatus: (v: string) => void;
    campaignCode: string;
    setCampaignCode: (v: string) => void;
    onSearch: (params: { campaign_code?: string; status?: string }) => void;
}

const RevenueFilters = ({ status, setStatus, campaignCode, setCampaignCode, onSearch, }: Props) => {
    const [search, setSearch] = useState(campaignCode);
    const [downloading, setDownloading] = useState(false);

    // 🔥 debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setCampaignCode(search);

            onSearch({
                campaign_code: search || undefined,
                status: status !== "all" ? status : undefined,
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [search, status]);

    const handleDownload = async () => {
        try {
            setDownloading(true);

            const params: any = {};

            if (campaignCode) params.campaign_code = campaignCode;
            if (status && status !== "all") params.status = status;

            const res = await revenueService.downloadRevenue(params);

            // ✅ CSV blob
            const blob = new Blob([res.data], { type: "text/csv;charset=utf-8;" });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;

            // ✅ CSV file name
            link.setAttribute("download", "revenue-report.csv");

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Download failed", error);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="flex items-center gap-4 mb-4">

            {/* LEFT: STATUS */}
            <Select value={status} onValueChange={(v) => setStatus(v)}>
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

            {/* MIDDLE: SEARCH (flex grow) */}
            <div className="relative flex-1">
                <Input
                    placeholder="Search Campaign Code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pr-8 w-full"
                />

                {search && (
                    <span
                        onClick={() => setSearch("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                    >
                        ✕
                    </span>
                )}
            </div>

            {/* RIGHT: DOWNLOAD */}
            <Can module="revenue" action="download">
                <Button
                    variant="lightprimary"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="whitespace-nowrap"
                >
                    {downloading ? "Downloading..." : "Download Report"}
                </Button>
            </Can>

        </div>
    );
};

export default RevenueFilters;