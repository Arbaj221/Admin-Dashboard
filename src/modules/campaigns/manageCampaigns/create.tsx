import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import CampaignForm from './components/form';

const CreateCampaign = () => {
  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/campaigns', title: 'Campaigns' },
    { title: 'Create Campaign' },
  ];

  return (
    <>
      <BreadcrumbComp title="Create Campaign" items={BCrumb} />
      <CampaignForm mode="create" />
    </>
  );
};

export default CreateCampaign;