import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container
} from '@mui/material'
import React from 'react'
import { PokemonDetail } from './interfaces/PokemonDetail'
import MenuIcon from '@mui/icons-material/Menu'
import { useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'

interface PokemonDetailsProps {}

interface PokemonQueryParams {
  name: string
}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { name } = useParams()

  const { data } = useQuery(`getPokemonDetails-${name}`, () =>
    getPokemonDetails(name)
  )

  const selectedPokemonDetails = data

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              {name}
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
          <Typography>
            {selectedPokemonDetails?.abilities.map((ability, index) => (
              <Typography key={index}>{ability.ability.name}</Typography>
            ))}
          </Typography>
        </Box>
      </Container>
    </>
  )
}
