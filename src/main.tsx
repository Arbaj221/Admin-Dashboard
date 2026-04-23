import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/styles/globals.css'
import App from './App.tsx'
import Spinner from './components/shared/spinner/Spinner.tsx'
import { ConfirmProvider } from './components/shared/confirmdialog/confirm-context.tsx'
import { PermissionProvider } from './permissions/PermissionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <PermissionProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </PermissionProvider>
  </Suspense>
)


