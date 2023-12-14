import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SentrySDK } from '@/sentry/sdk'
import App from './App'

SentrySDK.init()

const rootElement: HTMLElement = document.getElementById('root') as HTMLElement

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)
