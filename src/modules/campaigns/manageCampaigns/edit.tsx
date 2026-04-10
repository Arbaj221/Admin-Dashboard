import { useParams, useNavigate } from 'react-router';
import BreadcrumbComp from 'src/components/shared/breadcrumb/BreadcrumbComp';
import CampaignForm from './components/form';
import { campaignsData } from './data/campaigns.data';

const EditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const campaign = campaignsData.find((c) => c.id === Number(id));

  if (!campaign) {
    navigate('/campaigns');
    return null;
  }

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/campaigns', title: 'Campaigns' },
    { title: 'Edit Campaign' },
  ];

  return (
    <>
      <BreadcrumbComp title="Edit Campaign" items={BCrumb} />
      <CampaignForm
        mode="edit"
        initialData={{
          campaignName: campaign.name,
          campaignType: campaign.type.toLowerCase(),
          status: campaign.status.toLowerCase(),
          startDate: campaign.startDate,
          endDate: campaign.endDate,
          deliveryMethod: 'front_load',
          totalAllocation: String(campaign.allocation),
          totalDelivered: String(campaign.delivered),
          totalAccepted: String(campaign.accepted),
        }}
      />
    </>
  );
};

export default EditCampaign;