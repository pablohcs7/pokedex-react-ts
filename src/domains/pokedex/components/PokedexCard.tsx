import React, { useContext } from 'react'
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
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext'

interface PokedexCardProps {
  pokemon: PokemonDetail
}

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const { favorites, setFavorites } = useContext(FavoriteContext)

  const navigate = useNavigate()

  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`)
  }

  const addPokemonToFavorite = () => {
    setFavorites([...favorites, pokemon])
    console.log(favorites)
  }

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter(poke => poke.name !== pokemon.name))
  }

  const isFavorite = favorites.some(poke => poke.name === pokemon.name)

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="276"
            image={pokemon.sprites.front_default}
            alt={`${pokemon.name} image`}
            onClick={handleClick}
          />
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography component="div">
              <Typography gutterBottom variant="h5" component="div">
                {setFirstLetterUppercase(pokemon.name)}
              </Typography>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ displat: 'flex', justifyContent: 'space-between' }}>
          <Typography component="div">
            {pokemon.types.map((type, index) => (
              <Chip
                key={index}
                label={setFirstLetterUppercase(type.type.name)}
                sx={{ marginRight: 1 }}
              />
            ))}
          </Typography>
          <IconButton
            onClick={() =>
              isFavorite ? removePokemonFromFavorites() : addPokemonToFavorite()
            }
            aria-label="add to favorites"
          >
            <FavoriteIcon
              color={isFavorite ? 'error' : 'disabled'}
              sx={{ ':hover': { color: 'red', transition: '0.3s' } }}
            />
          </IconButton>
        </CardActions>
      </Card>
    </>
  )
}
