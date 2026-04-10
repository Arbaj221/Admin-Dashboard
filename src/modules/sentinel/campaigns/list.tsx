import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const SentinelCampaigns = () => {
    const BCrumb = [
        { to: '/', title: 'Sentinel' },
        { title: 'Campaigns' },
    ];

    return (
        <>
            <BreadcrumbComp title="Sentinel Campaigns" items={BCrumb} />
        </>
    )
}

export default SentinelCampaigns