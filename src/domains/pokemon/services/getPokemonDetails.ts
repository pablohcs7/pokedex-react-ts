import axios from 'axios'
import { PokemonDetail } from '../interfaces/PokemonDetail'

export interface PokemonListInterface {
  name: string
  url: string
}

export async function getPokemonDetails(
  pokemonName: string
): Promise<PokemonDetail> {
  const endpoint = `${import.meta.env.VITE_POKEAPI_URL}/pokemon/${pokemonName}`

  const response = await axios.get<PokemonDetail>(endpoint)

  return response.data
}
