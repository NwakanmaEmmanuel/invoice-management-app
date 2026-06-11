import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { InvoiceProvider } from './contexts/InvoiceContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InvoiceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </InvoiceProvider>
  </React.StrictMode>
)