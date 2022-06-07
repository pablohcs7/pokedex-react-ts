import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Pokedex } from './domains/pokedex/Pokedex'
import { PokemonDetails } from './domains/pokemon/PokemonDetails'

interface RoutesListProps {}

export const RoutesList: React.FC<RoutesListProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </>
  )
}
