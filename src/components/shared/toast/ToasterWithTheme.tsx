import { Toaster } from 'sonner';
import { useTheme } from 'src/theme/theme-provider';

const ToasterWithTheme = () => {
    const { theme } = useTheme();
    return (
        <Toaster
            theme={theme as 'dark' | 'light' | 'light'}
            position="top-right"
            toastOptions={{
                style: {
                    fontFamily: 'DM Sans, sans-serif',
                },
            }}
        />
    )
}

export default ToasterWithTheme