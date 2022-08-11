import { Type } from '../interfaces/PokemonDetail'

export function setBackgroundColor(types: Type[] | undefined) {
  if (types == undefined) {
    return
  } else {
    const mainType = types[0].type.name

    let backgroundColorBasedInType = ''

    const colours = {
      normal: '#A8A77A',
      fire: '#EE8130',
      water: '#6390F0',
      electric: '#F7D02C',
      grass: '#7AC74C',
      ice: '#96D9D6',
      fighting: '#C22E28',
      poison: '#A33EA1',
      ground: '#E2BF65',
      flying: '#A98FF3',
      psychic: '#F95587',
      bug: '#A6B91A',
      rock: '#B6A136',
      ghost: '#735797',
      dragon: '#6F35FC',
      dark: '#705746',
      steel: '#B7B7CE',
      fairy: '#D685AD'
    }

    switch (mainType) {
      case 'bug':
        backgroundColorBasedInType = colours.bug
        break
      case 'dragon':
        backgroundColorBasedInType = colours.dragon
        break
      case 'electric':
        backgroundColorBasedInType = colours.electric
        break
      case 'fighting':
        backgroundColorBasedInType = colours.fighting
        break
      case 'fire':
        backgroundColorBasedInType = colours.fire
        break
      case 'flying':
        backgroundColorBasedInType = colours.flying
        break
      case 'ghost':
        backgroundColorBasedInType = colours.ghost
        break
      case 'grass':
        backgroundColorBasedInType = colours.grass
        break
      case 'ground':
        backgroundColorBasedInType = colours.ground
        break
      case 'ice':
        backgroundColorBasedInType = colours.ice
        break
      case 'normal':
        backgroundColorBasedInType = colours.normal
        break
      case 'poison':
        backgroundColorBasedInType = colours.poison
        break
      case 'psychic':
        backgroundColorBasedInType = colours.psychic
        break
      case 'rock':
        backgroundColorBasedInType = colours.rock
        break
      case 'water':
        backgroundColorBasedInType = colours.water
        break
      case 'fairy':
        backgroundColorBasedInType = colours.fairy
        break
    }

    return backgroundColorBasedInType
  }
}
