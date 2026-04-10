import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const SentinelJobs = () => {
    const BCrumb = [
        { to: '/', title: 'Sentinel' },
        { title: 'Jobs' },
    ];

    return (
        <>
            <BreadcrumbComp title="Sentinel Jobs" items={BCrumb} />
        </>
    )
}

export default SentinelJobs