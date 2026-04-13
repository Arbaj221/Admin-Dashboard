import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import SentinelBatchesTable from "./components/table";

const SentinelBatches = () => {
    const BCrumb = [
        { to: '/', title: 'Home' },
        { to: '/sentinel-jobs', title: 'Jobs' },
        { to: '/sentinel-campaigns', title: 'Campaigns' },
        { title: 'Batches' },
    ];

    return (
        <>
            <SlimBreadcrumb title="Sentinel Batches" items={BCrumb} />
            <SentinelBatchesTable />
        </>
    )
}

export default SentinelBatches