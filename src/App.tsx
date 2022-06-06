import React from 'react'
import { Pokedex } from './domains/pokedex/Pokedex'

import './global.scss'

export const App: React.FC = () => {
  return (
    <>
      <Pokedex />
    </>
  )
}
