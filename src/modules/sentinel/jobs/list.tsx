import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";
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
            <BreadcrumbComp title="Sentinel Jobs" items={BCrumb} />
            <SentinelJobsTable/>
        </>
    )
}

export default SentinelJobs