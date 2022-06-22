import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FavoriteScreen } from './domains/favorites/contexts/FavoriteScreen'
import { Pokedex } from './domains/pokedex/Pokedex'
import { PokemonDetails } from './domains/pokemon/PokemonDetails'

interface RoutesListProps {}

export const RoutesList: React.FC<RoutesListProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/favoritos" element={<FavoriteScreen />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </>
  )
}
