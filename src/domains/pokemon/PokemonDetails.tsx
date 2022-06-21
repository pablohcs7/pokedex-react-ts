import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container
} from '@mui/material'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'
import { setFirstLetterUppercase } from './services/setFirstLetterUppercase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const navigate = useNavigate()

  const { name } = useParams()

  const { data } = useQuery(`getPokemonDetails-${name}`, () =>
    getPokemonDetails(name)
  )

  function goBack() {
    navigate('/')
  }

  const selectedPokemonDetails = data

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
