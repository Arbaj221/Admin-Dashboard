import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import SegmentForm from './form';

interface Props {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  campaignId?: number;
  segment?: any;
  onSuccess: () => void;
}

const SegmentDialog = ({ open, onClose, mode, campaignId, segment, onSuccess }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create Segment' : 'Edit Segment'}
          </DialogTitle>
        </DialogHeader>

        <SegmentForm
          mode={mode}
          campaignId={campaignId}
          segment={segment}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SegmentDialog;