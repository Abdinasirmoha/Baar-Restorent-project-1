import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ProfileProvider } from './context/ProfileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ProfileProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProfileProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
