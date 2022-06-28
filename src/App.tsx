import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import './global.scss'
import { RoutesList } from './RoutesList'
import { FavoriteProvider } from './domains/favorites/contexts/FavoriteContext'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <BrowserRouter>
            <RoutesList />
          </BrowserRouter>
        </FavoriteProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
