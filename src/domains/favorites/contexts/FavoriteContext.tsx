import React, { useState } from 'react'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'
import { PokemonDetails } from '../../pokemon/PokemonDetails'

interface FavoriteContextProps {
  favorites: PokemonDetail[]
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>
}

const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: [],
  setFavorites: () => console.warn('setFavorites is not ready')
})

export const FavoriteProvider: React.FC<FavoriteContextProps> = () => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([])

  return (
    <div>
      <FavoriteContext.Provider
        value={{
          favorites,
          setFavorites
        }}
      ></FavoriteContext.Provider>
    </div>
  )
}
