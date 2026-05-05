import { useState } from "react";
import AutoComplete from "./AutoComplete";
import MultiSelect from "src/components/ui/Multiselect";

const campaigns = [
  { id: 1, code: "CMP001", campaign_name: "Summer Sale Campaign" },
  { id: 2, code: "CMP002", campaign_name: "Winter Leads Campaign" },
  { id: 3, code: "CMP003", campaign_name: "Festive Offer Campaign" },
  { id: 4, code: "CMP004", campaign_name: "New Product Launch" },
];

const SegmentDetails = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | undefined>();

  const [selected, setSelected] = useState<string[]>([]);
  
  const options = campaigns.map((c) => ({
    label: `${c.code} - ${c.campaign_name}`,
    value: String(c.id),
  }));

  return (
    <div className="max-w-sm">
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        placeholder="Select campaigns..."
      />
      <AutoComplete
        options={options}
        value={selectedCampaignId ? String(selectedCampaignId) : ''}
        onChange={(val) => setSelectedCampaignId(val ? Number(val) : undefined)}
        placeholder="Select Campaign"
      />
    </div>
  );
};

export default SegmentDetails;