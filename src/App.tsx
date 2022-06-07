import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import './global.scss'
import { RoutesList } from './RoutesList'

export const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <RoutesList />
      </BrowserRouter>
    </>
  )
}
