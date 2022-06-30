import { Type } from '../interfaces/PokemonDetail'

export function setBackgroundColor(types: Type[]) {
  const mainType = types[0].type.name

  let backgroundColorBasedInType = ''

  switch (mainType) {
    case 'bug':
      backgroundColorBasedInType = '#abba38'
      break
    case 'dragon':
      backgroundColorBasedInType = '#6257a7'
      break
    case 'electric':
      backgroundColorBasedInType = '#f7d332'
      break
    case 'fighting':
      backgroundColorBasedInType = '#c4312b'
      break
    case 'fire':
      backgroundColorBasedInType = '#f17f2d'
      break
    case 'flying':
      backgroundColorBasedInType = '#9e8fc5'
      break
    case 'ghost':
      backgroundColorBasedInType = '#70599b'
      break
    case 'grass':
      backgroundColorBasedInType = '#78c351'
      break
    case 'ground':
      backgroundColorBasedInType = '#e0c166'
      break
    case 'ice':
      backgroundColorBasedInType = '#99d7d5'
      break
    case 'normal':
      backgroundColorBasedInType = '#adab7a'
      break
    case 'poison':
      backgroundColorBasedInType = '#9f4299'
      break
    case 'psychic':
      backgroundColorBasedInType = '#f15888'
      break
    case 'rock':
      backgroundColorBasedInType = '#b9a239'
      break
    case 'water':
      backgroundColorBasedInType = '#6e8ac7'
      break
  }

  return backgroundColorBasedInType
}
