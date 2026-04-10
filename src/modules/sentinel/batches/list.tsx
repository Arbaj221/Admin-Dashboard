import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

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
        </>
    )
}

export default SentinelBatches