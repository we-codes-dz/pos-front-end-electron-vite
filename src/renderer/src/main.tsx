import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import Providers from './providers'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Providers>
          <Router />
        </Providers>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
