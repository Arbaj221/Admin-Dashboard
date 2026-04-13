import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';
import CampaignOpsViewTable from './components/table';

const CampaignOpsView = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/campaigns', title: 'Campaigns' },
    { title: 'Ops View' },
  ];


  return (
    <>
      <SlimBreadcrumb title="Campaigns" items={BCrumb} />
      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Campaigns Ops View</h5>
        </div>

        <CampaignOpsViewTable />
      </CardBox>
    </>
  )
}

export default CampaignOpsView