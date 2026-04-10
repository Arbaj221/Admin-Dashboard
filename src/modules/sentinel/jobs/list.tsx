import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

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
        </>
    )
}

export default SentinelJobs