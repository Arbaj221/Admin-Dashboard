// src/components/shared/confirmdialog/confirm-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import ConfirmDialog from './ConfirmDialog';

type ConfirmOptions = {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
};

type ConfirmContextType = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<(value: boolean) => void>();

    const confirm: ConfirmContextType = (opts) => {
        setOptions(opts);
        setOpen(true);

        return new Promise<boolean>((resolve) => {
            setResolver(() => resolve);
        });
    };

    const handleClose = () => {
        setOpen(false);
        resolver?.(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        resolver?.(true);
    };

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}

            <ConfirmDialog
                open={open}
                onOpenChange={(v: any) => !v && handleClose()}
                {...options}
                onConfirm={handleConfirm}
            />
        </ConfirmContext.Provider>
    );
};

export const useConfirm = () => {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within ConfirmProvider');
    }
    return context;
};