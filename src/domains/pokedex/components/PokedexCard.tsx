import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography
} from '@mui/material'

import { IconButtonProps } from '@mui/material/IconButton'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'
import { setFirstLetterUppercase } from '../../pokemon/services/setFirstLetterUppercase'

interface PokedexCardProps {
  pokemon: PokemonDetail
}

// const Card = styled.section`
//   padding: 4rem;
//   border-radius: 0.5rem;
//   background: papayawhip;
// `

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`)
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }} onClick={handleClick}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="276"
            image={pokemon.sprites.front_default}
            alt={`${pokemon.name} image`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {setFirstLetterUppercase(pokemon.name)}
            </Typography>
            <Typography component="div">
              {pokemon.types.map(type => (
                <Chip
                  key={pokemon.id}
                  label={setFirstLetterUppercase(type.type.name)}
                  sx={{ marginRight: 1 }}
                />
              ))}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}
