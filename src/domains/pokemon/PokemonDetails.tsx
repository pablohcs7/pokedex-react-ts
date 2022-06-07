import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PokemonDetail } from './interfaces/PokemonDetail'
import MenuIcon from '@mui/icons-material/Menu'
import { useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'

interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    PokemonDetail | undefined
  >(undefined)

  const { name } = useParams()

  useEffect(() => {
    if (!name) return
    getPokemonDetails(name).then(response =>
      setSelectedPokemonDetails(response)
    )
  }, [])

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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box mt={2}>
          <img
            src={selectedPokemonDetails?.sprites.front_default}
            alt="Imagem do pokemon selecionado"
          />
          <h2>Pokemon Selecionado: {name}</h2>
          {/*selectedPokemon
          ? ` ${selectedPokemon.name}`
  : ' Nenhum pokémon selecionado'*/}
          {JSON.stringify(
            selectedPokemonDetails?.sprites.animated?.front_default,
            undefined,
            2
          )}
        </Box>
      </Container>
    </>
  )
}
