import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";
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
            <BreadcrumbComp title="Sentinel Batches" items={BCrumb} />
            <SentinelBatchesTable />
        </>
    )
}

export default SentinelBatches