import { Icon } from '@iconify/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';
import { cn } from 'src/lib/utils';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  loading?: boolean;
  onConfirm: () => void | Promise<void>;
}

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  loading = false,
  onConfirm,
}: ConfirmDialogProps) => {
  const isDestructive = variant === 'destructive';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        {/* Header */}
        <DialogHeader className="flex flex-col items-center text-center gap-3">
          {/* Icon */}
          <div
            className={cn(
              'flex items-center justify-center w-12 h-12 rounded-full',
              isDestructive
                ? 'bg-lighterror text-error'
                : 'bg-lightprimary text-primary'
            )}
          >
            <Icon
              icon={
                isDestructive
                  ? 'heroicons:exclamation-triangle'
                  : 'heroicons:information-circle'
              }
              width={24}
              height={24}
            />
          </div>

          {/* Title */}
          <DialogTitle className="text-lg">
            {title}
          </DialogTitle>

          {/* Description */}
          {description && (
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Footer */}
        <DialogFooter className="mt-6 flex justify-center sm:justify-end gap-2">
          {/* Cancel */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-lightprimary transition"
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              'px-4 py-2 rounded-md text-white transition flex items-center gap-2',
              isDestructive
                ? 'bg-error hover:bg-erroremphasis'
                : 'bg-primary hover:bg-primaryemphasis'
            )}
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {confirmText}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;