import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Chip,
  IconButton,
  Typography
} from '@mui/material'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'
import { setFirstLetterUppercase } from '../../pokemon/services/setFirstLetterUppercase'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { FavoriteContext } from '../../favorites/contexts/FavoriteContext'
import { setBackgroundColor } from '../../pokemon/services/setBackgroundColor'

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
  }

  const removePokemonFromFavorites = () => {
    setFavorites(favorites.filter((poke) => poke.name !== pokemon.name))
  }

  const isFavorite = favorites.some((poke) => poke.name === pokemon.name)

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: `${setBackgroundColor(pokemon.types)}`
        }}
      >
        <CardActionArea
          onClick={handleClick}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <CardMedia
            component="img"
            image={
              pokemon.sprites.versions?.['generation-v']['black-white'].animated
                ?.front_default
            }
            alt={`${pokemon.name} image`}
            sx={{ position: 'absolute', zIndex: 1, width: '175px' }}
          />

          <CardMedia
            component="img"
            height="100%"
            image="src\domains\pokedex\components\assets\pokeball-icon.svg"
            sx={{ opacity: '0.5' }}
          />
        </CardActionArea>
        <CardActions
          sx={{
            display: 'grid',
            backgroundColor: 'white',
            justifyItems: 'center'
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {pokemon.id}. {setFirstLetterUppercase(pokemon.name)}
          </Typography>
          <Typography
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
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
                isFavorite
                  ? removePokemonFromFavorites()
                  : addPokemonToFavorite()
              }
              aria-label="add to favorites"
            >
              <FavoriteIcon
                color={isFavorite ? 'error' : 'disabled'}
                sx={{ ':hover': { color: 'red', transition: '0.3s' } }}
              />
            </IconButton>
          </Typography>
        </CardActions>
      </Card>
    </>
  )
}
