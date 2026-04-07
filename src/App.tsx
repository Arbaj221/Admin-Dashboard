import { RouterProvider } from 'react-router';
import router from './routes/Router';
import './styles/globals.css';
import { ThemeProvider } from './theme/theme-provider';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
