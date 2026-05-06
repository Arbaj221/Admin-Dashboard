import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Download, Filter, RotateCcw } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";

import { revenueService } from "../service/revenueService";
import { toast } from "sonner";

interface Props {
    open: boolean;
    onClose: () => void;
}

const getCssVar = (name: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const SummaryDialog = ({ open, onClose }: Props) => {
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // 🔥 Theme (dark/light safe)
    const textColor = getCssVar("--foreground");
    const mutedText = getCssVar("--muted-foreground");
    const borderColor = getCssVar("--border");

    // 🔥 Helpers
    const hasFilters = !!startDate || !!endDate;
    const hasData = data.length > 0;

    // 🔥 Fetch
    const fetchSummary = async (customParams?: any) => {
        try {
            setLoading(true);

            const params = customParams ?? {};
            if (!customParams) {
                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;
            }

            const res = await revenueService.getSummary(params);
            setData(res || []);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchSummary();
    }, [open]);

    // 🔥 Apply
    const handleApply = () => {
        if (startDate && endDate && startDate > endDate) {
            toast.error("Start date cannot be after end date");
            return;
        }
        fetchSummary();
    };

    // 🔥 Reset (clean)
    const handleReset = async () => {
        setStartDate("");
        setEndDate("");

        await fetchSummary({}); // 🔥 force empty params
    };

    // 🔥 Download
    const handleDownload = async () => {
        try {
            setDownloading(true);

            const params: any = {};
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;

            const res = await revenueService.downloadSummary(params);

            if (!res?.data) {
                toast.info("No data available");
                return;
            }

            const blob = new Blob(["\uFEFF", res.data], {
                type: "text/csv;charset=utf-8;",
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "revenue-summary.csv");

            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Summary downloaded");
        } catch (e: any) {
            toast.error(e?.message || "Download failed");
        } finally {
            setDownloading(false);
        }
    };

    // 🔥 Data
    const months = data.map((d) => d.month);

    const leadsSeries = [
        { name: "Booked", data: data.map((d) => d.booked_leads) },
        { name: "Accepted", data: data.map((d) => d.accepted_leads.value) },
        { name: "Deficit", data: data.map((d) => d.deficit_leads.value) },
    ];

    const revenueSeries = [
        { name: "Booked", data: data.map((d) => d.booked_revenue) },
        { name: "Accepted", data: data.map((d) => d.accepted_revenue) },
        { name: "Pending", data: data.map((d) => d.revenue_pending) },
    ];

    // 🔥 Shared chart config (DARK MODE FIX)
    const baseOptions: ApexOptions = {
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            foreColor: textColor, // 🔥 important
            background: "transparent",
        },
        xaxis: {
            categories: months,
            labels: {
                style: {
                    colors: months.map(() => textColor), // 🔥 FIX
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: [textColor], // 🔥 FIX
                },
            },
        },
        grid: {
            borderColor: borderColor,
            strokeDashArray: 3,
        },
        tooltip: {
            theme: document.documentElement.classList.contains("dark")
                ? "dark"
                : "light",
        },
        dataLabels: { enabled: false },
        legend: {
            labels: {
                colors: textColor,
            },
        },
    };

    const leadsOptions: ApexOptions = {
        ...baseOptions,

        colors: [
            "#FEB019", // 🔥 Apex yellow (Booked)
            "#00E396", // 🔥 Apex green (Accepted)
            "#FF4560", // 🔥 Apex red (Deficit)
        ],

        chart: {
            ...baseOptions.chart,
            type: "bar" as const,
        },

        plotOptions: {
            bar: {
                columnWidth: "30%",
                borderRadius: 3,
            },
        },
    };
    const revenueOptions: ApexOptions = {
        ...baseOptions,

        colors: [
            "#FEB019", // 🔥 Allocation / Booked
            "#00E396", // 🔥 Accepted
            "#FF4560", // 🔥 Pending / Deficit
        ],

        chart: {
            ...baseOptions.chart,
            type: "area" as const,
        },

        stroke: {
            curve: "smooth",
            width: 2,
        },

        yaxis: {
            labels: {
                formatter: (v: number) => `${v.toLocaleString()}`,
            },
        },
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) {
                    setStartDate("");
                    setEndDate("");
                    setData([]);
                    onClose();
                }
            }}
        >
            <DialogContent className="max-w-7xl">

                {/* HEADER */}
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Revenue Summary</DialogTitle>
                </DialogHeader>

                {/* FILTERS */}
                <div className="px-6 pt-4 flex gap-3 items-center">
                    <input
                        type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm"
                    />

                    <input
                        type="date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm"
                    />

                    <Button
                        variant="lightprimary"
                        onClick={handleApply}
                        className="flex items-center gap-2"
                    >
                        <Filter size={16} />
                        Apply
                    </Button>

                    <Button
                        variant="lighterror"
                        onClick={handleReset}
                        disabled={!hasFilters}
                        className="flex items-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </Button>

                    <Button
                        variant="lightprimary"
                        onClick={handleDownload}
                        disabled={downloading || !hasData}
                        className="ml-auto flex items-center gap-2"
                    >
                        <Download size={16} />
                        {downloading ? "Downloading..." : "Download"}
                    </Button>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="text-center py-20 text-muted-foreground">
                        Loading...
                    </div>
                ) : data.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        No data available
                    </div>
                ) : (
                    <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-5">

                        <div className="rounded-xl border p-4">
                            <p className="text-sm font-semibold mb-3">Leads</p>
                            <Chart options={leadsOptions} series={leadsSeries} type="bar" height={260} />
                        </div>

                        <div className="rounded-xl border p-4">
                            <p className="text-sm font-semibold mb-3">Revenue</p>
                            <Chart options={revenueOptions} series={revenueSeries} type="area" height={260} />
                        </div>

                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SummaryDialog;