import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail'
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails'
import {
  listPokemons,
  PokemonListInterface
} from '../pokemon/services/listPokemons'

export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonListInterface | undefined
  >(undefined)
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    PokemonDetail | undefined
  >(undefined)

  useEffect(() => {
    listPokemons().then(response => setPokemons(response.results))
  }, [])

  useEffect(() => {
    if (!selectedPokemon) return

    axios
    getPokemonDetails(selectedPokemon.name).then(response =>
      setSelectedPokemonDetails(response)
    )

    return () => {}
  }, [selectedPokemon])

  return (
    <div>
      <h1>Pokédex</h1>

      <div className="pokemons-list">
        <h2>Pokémons</h2>
        {pokemons.map(pokemon => (
          <button onClick={() => setSelectedPokemon(pokemon)}>
            {pokemon.name}
          </button>
        ))}
      </div>

      <h2>
        Pokémon Selecionado:
        {selectedPokemon
          ? ` ${selectedPokemon.name}`
          : ' Nenhum pokémon selecionado'}
      </h2>

      <div>
        <h3>Detalhes: {JSON.stringify(selectedPokemonDetails)}</h3>
      </div>
    </div>
  )
}
