import axios from 'axios'

export interface PokemonListInterface {
  name: string
  url: string
}

interface ListPokemonsInterface {
  count: number
  next: null | string
  previous: null | string
  results: PokemonListInterface[]
}

export async function listPokemons(): Promise<ListPokemonsInterface> {
  const endpoint = `${import.meta.env.VITE_POKEAPI_URL}/pokemon`

  const response = await axios.get<ListPokemonsInterface>(endpoint)

  console.log(response)

  return response.data
}
