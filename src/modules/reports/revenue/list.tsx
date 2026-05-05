import { useEffect, useState } from "react";

import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import CardBox from "src/components/shared/CardBox";

import RevenueTable from "./components/table";
import RevenueFilters from "./components/filters";

import { revenueService } from "./service/revenueService";
import Pagination from "./components/pagination";

const RevenueList = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [total, setTotal] = useState(0);
    const [campaignCode, setCampaignCode] = useState("");
    const [status, setStatus] = useState("all");

    const BCrumb = [
        { to: "/", title: "Home" },
        { title: "Reports" },
        { title: "Revenue" },
    ];

    const fetchRevenue = async (params?: {
        campaign_code?: string;
        status?: string;
        page?: number;
        limit?: number;
    }) => {
        try {
            setLoading(true);

            const res = await revenueService.getRevenue({
                campaign_code: campaignCode || undefined,
                status: status !== "all" ? status : undefined,
                page,
                limit,
                ...params,
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

    useEffect(() => {
        fetchRevenue();
    }, [page, limit, campaignCode, status]);

    return (
        <>
            <SlimBreadcrumb title="Revenue" items={BCrumb} />

            <CardBox>

                <RevenueFilters
                    status={status}
                    setStatus={setStatus}
                    campaignCode={campaignCode}
                    setCampaignCode={setCampaignCode}
                    onSearch={fetchRevenue}
                />

                <RevenueTable data={data} loading={loading} />
                <Pagination
                    page={page}
                    limit={limit}
                    total={total}
                    onPageChange={(p) => setPage(p)}
                    onLimitChange={(l) => {
                        setLimit(l);
                        setPage(1); // 🔥 reset page
                    }}
                />
            </CardBox>
        </>
    );
};

export default RevenueList;