import React, { PropsWithChildren, useState } from 'react'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'

interface FavoriteContextProps {
  favorites: PokemonDetail[]
  setFavorites: React.Dispatch<React.SetStateAction<PokemonDetail[]>>
}

interface ChildrenInterface {
  children?: any
}

export const FavoriteContext = React.createContext<FavoriteContextProps>({
  favorites: [],
  setFavorites: () => console.warn('setFavorites is not ready')
})

export const FavoriteProvider: React.FC<
  PropsWithChildren<ChildrenInterface>
> = ({ children }) => {
  const [favorites, setFavorites] = useState<PokemonDetail[]>([])

  return (
    <div>
      <FavoriteContext.Provider
        value={{
          favorites,
          setFavorites
        }}
      >
        {children}
      </FavoriteContext.Provider>
    </div>
  )
}
