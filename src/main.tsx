import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/globals.css'
import App from './App.tsx'
import Spinner from './components/shared/spinner/Spinner.tsx'
import { ConfirmProvider } from './components/shared/confirmdialog/confirm-context.tsx'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <ConfirmProvider>
      <App />
    </ConfirmProvider>
  </Suspense>
)

