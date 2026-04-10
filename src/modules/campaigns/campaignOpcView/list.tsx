import BreadcrumbComp from "src/components/shared/breadcrumb/BreadcrumbComp";

const CampaignOpcView = () => {
  const BCrumb = [
    { to: '/', title: 'Campaigns' },
    { title: 'Opc View' },
  ];

  return (
    <>
      <BreadcrumbComp title="Campaigns" items={BCrumb} />
    </>
  )
}

export default CampaignOpcView