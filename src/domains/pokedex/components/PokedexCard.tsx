import React from 'react'
import styled from 'styled-components'
import { PokemonListInterface } from '../../pokemon/services/listPokemons'
import { useNavigate } from 'react-router-dom'

interface PokedexCardProps {
  pokemon: PokemonListInterface
}

const Card = styled.section`
  padding: 4rem;
  border-radius: 0.5rem;
  background: papayawhip;
`

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`)
  }

  return (
    <>
      <Card onClick={handleClick}>{pokemon.name}</Card>
    </>
  )
}
