import axios from 'axios'
import { PokemonDetail } from '../interfaces/PokemonDetail'
import { getPokemonDetails } from './getPokemonDetails'

export interface PokemonListInterface {
  name: string
  url: string
}

interface ListPokemonsInterface {
  count: number
  next: null | string
  previous: null | string
  results: PokemonDetail[]
}

export async function listPokemons(): Promise<ListPokemonsInterface> {
  //para listar os pokemons da primeira geração acrescente ?limit=151 logo depois de pokemon na template string
  const endpoint = `${import.meta.env.VITE_POKEAPI_URL}/pokemon`

  const response = await axios.get<ListPokemonsInterface>(endpoint)

  const promiseArr = response.data.results.map(({ name }) =>
    getPokemonDetails(name)
  )
  const resultsPromise = await Promise.all(promiseArr)

  return {
    ...response.data,
    results: resultsPromise
  }
}
