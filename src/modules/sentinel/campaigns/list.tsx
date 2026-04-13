import SlimBreadcrumb from "src/components/shared/breadcrumb/SlimBreadcrumb";
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
      <SlimBreadcrumb title="Sentinel Campaigns" items={BCrumb} />
      <SentinelCampaignsTable/>
    </>
  )
}

export default SentinelCampaigns