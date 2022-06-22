import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography
} from '@mui/material'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'
import { setFirstLetterUppercase } from '../../pokemon/services/setFirstLetterUppercase'
import FavoriteIcon from '@mui/icons-material/Favorite'

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
        <CardActions
          disableSpacing
          sx={{ display: 'flex', justifyContent: 'end' }}
        >
          <IconButton aria-label="add to favorites">
            <FavoriteIcon sx={{ ':hover': { color: 'red' } }} />
          </IconButton>
        </CardActions>
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
              {pokemon.types.map((type, index) => (
                <Chip
                  key={index}
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
