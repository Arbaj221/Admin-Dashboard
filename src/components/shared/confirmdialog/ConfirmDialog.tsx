// ConfirmDialog.tsx (replace your current)
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

const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
}: any) => {
  const isDestructive = variant === 'destructive';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        
        {/* Top Accent */}
        <div
          className={cn(
            'h-1 w-full',
            isDestructive ? 'bg-error' : 'bg-primary'
          )}
        />

        <div className="p-6 text-center">
          {/* Icon */}
          <div
            className={cn(
              'mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-full shadow-sm',
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
              width={26}
              height={26}
            />
          </div>

          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-semibold">
              {title}
            </DialogTitle>

            {description && (
              <DialogDescription className="text-sm text-muted-foreground max-w-sm mx-auto">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Actions */}
          <DialogFooter className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-md border border-border text-foreground hover:bg-lightprimary transition"
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={cn(
                'px-5 py-2 rounded-md text-white font-medium shadow-sm transition',
                isDestructive
                  ? 'bg-error hover:bg-erroremphasis'
                  : 'bg-primary hover:bg-primaryemphasis'
              )}
            >
              {confirmText}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;