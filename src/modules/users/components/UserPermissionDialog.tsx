import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserPermissionDialog = ({ open, onClose }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>User Permissions</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground">
          Coming soon...
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionDialog;