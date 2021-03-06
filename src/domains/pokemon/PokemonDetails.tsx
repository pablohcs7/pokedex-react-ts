import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container
} from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'
import { setFirstLetterUppercase } from './services/setFirstLetterUppercase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'

import FavoriteIcon from '@mui/icons-material/Favorite'

interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext)
  const navigate = useNavigate()

  const { name } = useParams()

  const { data } = useQuery(`getPokemonDetails-${name}`, () =>
    getPokemonDetails(name)
  )

  function goBack() {
    navigate('/')
  }
  const selectedPokemonDetails = data

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return
    setFavorites([...favorites, selectedPokemonDetails])
  }

  const removePokemonFromFavorites = () => {
    if (!selectedPokemonDetails) return

    setFavorites(
      favorites.filter(poke => poke.name !== selectedPokemonDetails.name)
    )
  }

  const isFavorite = favorites.some(
    poke => poke.name === selectedPokemonDetails?.name
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#0075BE' }}>
          <Toolbar>
            <IconButton
              onClick={goBack}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              {setFirstLetterUppercase(name)}
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
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box mt={2}>
          <img
            width="100%"
            height="auto"
            src={selectedPokemonDetails?.sprites.front_default}
            alt="Imagem do pokemon selecionado"
          />
        </Box>
        <Typography variant="h2">{selectedPokemonDetails?.name}</Typography>
        {selectedPokemonDetails?.types.map((type, index) => (
          <Typography key={index}>{type.type.name}</Typography>
        ))}

        <Box display="flex">
          <Typography>Esp??cie:</Typography>
          <Typography>{selectedPokemonDetails?.species.name}</Typography>
        </Box>

        <Box display="flex">
          <Typography>Altura:</Typography>
          <Typography>{selectedPokemonDetails?.height}</Typography>
        </Box>

        <Box display="flex">
          <Typography>Peso:</Typography>
          <Typography>{selectedPokemonDetails?.weight}</Typography>
        </Box>

        <Box display="flex">
          <Typography>Habilidades:</Typography>
          {selectedPokemonDetails?.abilities.map((ability, index) => (
            <Typography key={index}>{ability.ability.name}</Typography>
          ))}
        </Box>
      </Container>
    </>
  )
}
