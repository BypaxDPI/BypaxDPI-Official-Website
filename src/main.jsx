import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'
import { GitHubReleasesProvider } from './context/GitHubReleasesContext'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <GitHubReleasesProvider>
        <App />
        <Analytics />
      </GitHubReleasesProvider>
    </LanguageProvider>
  </StrictMode>,
)
