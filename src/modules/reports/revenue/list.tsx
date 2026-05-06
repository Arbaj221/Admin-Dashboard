import { useEffect, useState } from "react";

import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";

import RevenueTable from "./components/table";
import RevenueFilters from "./components/filters";
import Pagination from "./components/pagination";

import { revenueService } from "./service/revenueService";
import { campaignService } from "src/modules/campaigns/manageCampaigns/services/campaignService";
import { toast } from "sonner";
import SummaryDialog from "./components/SummaryDialog";

const RevenueList = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState<{
        campaign_code?: string;
        status?: string;
        date?: string;
    }>({});
    const handleOpenSummary = () => {
        setSummaryOpen(true);
    };
    const [downloading, setDownloading] = useState(false);

    const [campaignOptions, setCampaignOptions] = useState<
        { label: string; value: string }[]
    >([]);

    const BCrumb = [
        { to: "/", title: "Home" },
        { title: "Reports" },
        { title: "Revenue" },
    ];

    // 🔥 Fetch revenue
    const fetchRevenue = async () => {
        try {
            setLoading(true);

            const res = await revenueService.getRevenue({
                ...filters,
                page,
                limit,
            });

            setData(res.data || []);
            setTotal(res.total || 0);

        } catch {
            setData([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 Apply filters
    const handleApply = (newFilters: any) => {
        setFilters(newFilters);
        setPage(1);
    };

    // 🔥 Download
    const handleDownload = async (filters: any) => {
        try {
            setDownloading(true);

            const res = await revenueService.downloadRevenue(filters);

            if (!res || !res.data) {
                toast.info("No data available to download");
                return;
            }

            const blob = new Blob(["\uFEFF", res.data], {
                type: "text/csv;charset=utf-8;",
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "revenue-report.csv");

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            // ✅ SUCCESS
            toast.success("Report downloaded successfully");

        } catch (error: any) {
            console.error("Download failed:", error);

            // ❌ ERROR
            toast.error(
                error?.response?.data?.detail ||
                error?.message ||
                "Failed to download report"
            );

        } finally {
            setDownloading(false);
        }
    };

    // 🔥 Load campaigns (for multiselect)
    useEffect(() => {
        const loadCampaigns = async () => {
            try {
                const res = await campaignService.getCampaigns?.(); // or your campaignService
                const mapped =
                    res?.map((c: any) => ({
                        label: `${c.code}`,
                        value: c.code,
                    })) || [];

                setCampaignOptions(mapped);
            } catch {
                setCampaignOptions([]);
            }
        };

        loadCampaigns();
    }, []);

    // 🔥 Fetch on change
    useEffect(() => {
        fetchRevenue();
    }, [page, limit, filters]);

    return (
        <>
            <SlimBreadcrumb title="Revenue" items={BCrumb} />

            <CardBox>

                <RevenueFilters
                    onOpenSummary={handleOpenSummary}
                    campaigns={campaignOptions}
                    onApply={handleApply}
                    onDownload={handleDownload}
                    downloading={downloading}
                    hasData={data.length > 0}
                />

                <RevenueTable data={data} loading={loading} />

                <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={(p) => setPage(p)}
                    onLimitChange={(l) => {
                        setLimit(l);
                        setPage(1);
                    }}
                />

            </CardBox>
            <SummaryDialog
                open={summaryOpen}
                onClose={() => setSummaryOpen(false)}
            />
        </>
    );
};

export default RevenueList;