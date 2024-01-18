import ReactDOM from 'react-dom/client'
import './assets/index.css'
import Providers from './providers'
import { HashRouter } from 'react-router-dom'
import Router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Providers>
        <Router />
      </Providers>
    </HashRouter>
  </QueryClientProvider>
)
