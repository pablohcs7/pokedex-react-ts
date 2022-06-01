import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface PokemonListInterface {
  name: string
  url: string
}

export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonListInterface | undefined
  >(undefined)
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    any | undefined
  >(undefined)

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then(response => setPokemons(response.data.results))
  }, [])

  useEffect(() => {
    if (!selectedPokemon) return

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon.name}`)
      .then(response => setSelectedPokemonDetails(response.data))

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
