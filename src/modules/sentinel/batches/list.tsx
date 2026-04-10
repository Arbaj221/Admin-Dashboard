import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const SentinelBatches = () => {
    const BCrumb = [
        { to: '/', title: 'Sentinel' },
        { title: 'Batches' },
    ];

    return (
        <>
            <BreadcrumbComp title="Sentinel Batches" items={BCrumb} />
        </>
    )
}

export default SentinelBatches