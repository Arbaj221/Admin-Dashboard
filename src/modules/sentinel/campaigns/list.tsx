import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";
import SentinelCampaignsTable from "./components/table";

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
      <SentinelCampaignsTable/>
    </>
  )
}

export default SentinelCampaigns