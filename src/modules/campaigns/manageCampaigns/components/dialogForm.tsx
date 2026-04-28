import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from 'src/components/ui/dialog';

import CampaignForm from './form';
import { Campaign } from '../services/campaignService';
import { Client } from 'src/modules/clients/services/clientService';
import SegmentTable from './segmentTable';
import Can from 'src/permissions/Can';

interface Props {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    campaign?: Campaign;
    clients: Client[];
}

const CampaignDialog = ({ open, onClose, mode, campaign, clients, }: Props) => {

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-8xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create Campaign' : 'Edit Campaign'}
                    </DialogTitle>
                </DialogHeader>

                {/* ✅ Don't mount form until data is ready in edit mode */}
                {mode === 'edit' && !campaign ? (
                    <div className="flex items-center justify-center py-10">
                        <span className="text-muted-foreground text-sm">Loading...</span>
                    </div>
                ) : (
                    <CampaignForm
                        key={campaign?.id ?? 'create'}
                        mode={mode}
                        onSuccess={onClose}
                        clients={clients}
                        campaignId={campaign?.id}
                        initialData={
                            campaign
                                ? {
                                    ...campaign,
                                    client_id: String(campaign.client_id),
                                    total_allocation: String(campaign.total_allocation),
                                    total_delivered: String(campaign.total_delivered),
                                    total_accepted: String(campaign.total_accepted),
                                    total_rejected: String(campaign.total_rejected),
                                    cpl: String(campaign.cpl),
                                }
                                : undefined
                        }
                    />
                )}
                <Can module="Campaign_segment" action="view">
                    {mode === 'edit' && campaign?.id && (
                        <SegmentTable campaignId={campaign.id} />
                    )}
                </Can>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignDialog;