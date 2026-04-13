import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CampaignsTable from './components/table';
import CardBox from 'src/components/shared/CardBox';
import { campaignsData as initialData } from './data/campaigns.data';
import { Campaign } from './types/campaign.types';

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialData);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { to: '/campaigns-ops-view', title: 'Campaigns Opc View' },
    { title: 'Campaigns' },
  ];

  const handleDelete = (id: number) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <>
      <SlimBreadcrumb title="" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Campaigns List</h5>
          <Link to="/campaigns/create">
            <button className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer">
              <Icon icon="solar:add-circle-linear" width={18} height={18} />
              Create Campaign
            </button>
          </Link>
        </div>

        <CampaignsTable campaigns={campaigns} onDelete={handleDelete} />
      </CardBox>
    </>
  );
};

export default CampaignsList;