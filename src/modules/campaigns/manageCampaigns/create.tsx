import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CampaignForm from './components/form';

const CreateCampaign = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/campaigns', title: 'Campaigns' },
    { title: 'Create Campaign' },
  ];

  return (
    <>
      <SlimBreadcrumb title="Create Campaign" items={BCrumb} />
      <CampaignForm mode="create" />
    </>
  );
};

export default CreateCampaign;