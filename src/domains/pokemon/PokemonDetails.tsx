import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Chip
} from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { setFirstLetterUppercase } from './services/setFirstLetterUppercase'

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
      favorites.filter((poke) => poke.name !== selectedPokemonDetails.name)
    )
  }

  const isFavorite = favorites.some(
    (poke) => poke.name === selectedPokemonDetails?.name
  )

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#F2B807'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              onClick={goBack}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              component="img"
              src="../src/domains/assets/pokemon-logo.png"
              sx={{ width: '100px' }}
            />
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
                sx={{ ':hover': { color: '#D93E30', transition: '0.3s' } }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2rem'
          }}
        >
          <Typography variant="h3">
            {setFirstLetterUppercase(selectedPokemonDetails?.name)}
          </Typography>
          <Typography>
            {selectedPokemonDetails?.types.map((type, index) => (
              <Chip
                key={index}
                label={setFirstLetterUppercase(type.type.name)}
                sx={{ marginRight: 1 }}
              />
            ))}
          </Typography>
          <img
            width="100%"
            height="auto"
            src={selectedPokemonDetails?.sprites.front_default}
            alt="Imagem do pokemon selecionado"
          />
          <Typography></Typography>
        </Box>

        <Box display="flex">
          <Typography>Espécie:</Typography>
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
