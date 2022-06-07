import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Pokedex } from './domains/pokedex/Pokedex'

interface RoutesListProps {}

export const RoutesList: React.FC<RoutesListProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route
          path="/pokemon"
          element={
            <>
              <h1>PokemonDetails</h1>
            </>
          }
        />
      </Routes>
    </>
  )
}
