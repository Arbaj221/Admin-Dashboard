import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
import SentinelJobsTable from "./components/SentinelJobsTable";

const SentinelJobs = () => {
    const BCrumb = [
        { to: '/', title: 'Sentinel' },
         { to: '/sentinel-batches', title: 'Batches' },
        { to: '/sentinel-campaigns', title: 'Campaigns' },
        { title: 'Jobs' },
    ];

    return (
        <>
            <SlimBreadcrumb title="Sentinel Jobs" items={BCrumb} />
            <SentinelJobsTable/>
        </>
    )
}

export default SentinelJobs