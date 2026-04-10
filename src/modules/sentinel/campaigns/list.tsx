import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const SentinelCampaigns = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/sentinel-batches', title: 'batches' },
    { to: '/sentinel-jobs', title: 'Jobs' },
    { title: 'Campaigns' },
  ];

  return (
    <>
      <BreadcrumbComp title="Sentinel Campaigns" items={BCrumb} />
    </>
  )
}

export default SentinelCampaigns