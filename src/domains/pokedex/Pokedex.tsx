import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PokemonDetail } from '../pokemon/interfaces/PokemonDetail'
import { getPokemonDetails } from '../pokemon/services/getPokemonDetails'
import {
  listPokemons,
  PokemonListInterface
} from '../pokemon/services/listPokemons'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid
} from '@mui/material'

export const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonListInterface[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<
    PokemonListInterface | undefined
  >(undefined)
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState<
    PokemonDetail | undefined
  >(undefined)

  useEffect(() => {
    listPokemons().then(response => setPokemons(response.results))
  }, [])

  useEffect(() => {
    if (!selectedPokemon) return

    axios
    getPokemonDetails(selectedPokemon.name).then(response =>
      setSelectedPokemonDetails(response)
    )

    return () => {}
  }, [selectedPokemon])

  return (
    <div>
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
              Pokédex
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box mt={2}>
          <h2>Pokémons</h2>
          <Grid container spacing={2}>
            {pokemons.map(pokemon => (
              <>
                <Grid item xs={6} lg={3}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {pokemon.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => setSelectedPokemon(pokemon)}
                      >
                        Saiba Mais!
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>

          <h2>
            Pokémon Selecionado:
            {selectedPokemon
              ? ` ${selectedPokemon.name}`
              : ' Nenhum pokémon selecionado'}
          </h2>

          <div>
            <h3>Detalhes: {JSON.stringify(selectedPokemonDetails)}</h3>
          </div>
        </Box>
      </Container>
    </div>
  )
}
