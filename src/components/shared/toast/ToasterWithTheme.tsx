import { Toaster } from 'sonner';

const ToasterWithTheme = () => {
    return (
        <Toaster
            position="top-center"
            richColors
            toastOptions={{
                classNames: {
                    toast:
                        'bg-card text-foreground border border-border shadow-md rounded-md px-4 py-3',

                    title: 'text-sm font-medium',

                    description: 'text-sm text-muted-foreground',

                    actionButton:
                        'bg-primary text-white hover:bg-primaryemphasis',

                    cancelButton:
                        'bg-muted text-foreground hover:bg-muted/80',

                    success:
                        'bg-lightsuccess text-success border border-success/20',

                    error:
                        'bg-lighterror text-error border border-error/20',

                    warning:
                        'bg-lightwarning text-warning border border-warning/20',

                    info:
                        'bg-lightinfo text-info border border-info/20',
                },
                style: {
                    fontFamily: 'DM Sans, sans-serif',
                },
            }}
        />
    );
};

export default ToasterWithTheme;