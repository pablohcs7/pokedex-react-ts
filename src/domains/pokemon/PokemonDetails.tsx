import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Chip,
  Divider
} from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { setFirstLetterUppercase } from './services/setFirstLetterUppercase'
import { setBackgroundColor } from './services/setBackgroundColor'

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
    <Typography
      component="div"
      sx={{
        minHeight: '100vh',
        backgroundColor: `${setBackgroundColor(selectedPokemonDetails?.types)}`
      }}
    >
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
            {`#${selectedPokemonDetails?.id}. ${setFirstLetterUppercase(
              selectedPokemonDetails?.name
            )}`}
          </Typography>

          <Box sx={{ mt: '0.5rem' }}>
            {selectedPokemonDetails?.types.map((type, index) => (
              <Chip
                key={index}
                label={setFirstLetterUppercase(type.type.name)}
                sx={{
                  marginRight: 1,
                  boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.40)',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
              />
            ))}
          </Box>

          <Typography
            component="img"
            src={selectedPokemonDetails?.sprites.front_default}
            alt="Imagem do pokemon selecionado"
            sx={{ width: '70%' }}
          />
        </Box>

        <Divider variant="middle" sx={{ mb: '4rem', backgroundColor: '' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
            padding: '1rem',
            backgroundColor: 'white'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
              borderRadius: '10px',
              padding: '1rem',
              gap: '0.3rem',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5">Abilities</Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                maxWidth: '70%'
              }}
            >
              {selectedPokemonDetails?.abilities.map((ability, index) => (
                <Typography key={index}>{ability.ability.name}</Typography>
              ))}
            </Box>
          </Box>

          <Box display="flex">
            <Typography>Altura:</Typography>
            <Typography>{selectedPokemonDetails?.height}</Typography>
          </Box>

          <Box display="flex">
            <Typography>Peso:</Typography>
            <Typography>{selectedPokemonDetails?.weight}</Typography>
          </Box>
        </Box>
      </Container>
    </Typography>
  )
}
