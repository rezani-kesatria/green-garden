import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/gsap' // register GSAP plugins before any component code runs
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
