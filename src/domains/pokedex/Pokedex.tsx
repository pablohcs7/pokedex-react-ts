import React from 'react'

import { listPokemons } from '../pokemon/services/listPokemons'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button, Container, Grid } from '@mui/material'
import { PokedexCard } from './components/PokedexCard'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useQuery } from 'react-query'

export const Pokedex: React.FC = () => {
  const { data } = useQuery(`listPokemons`, listPokemons)

  return (
    <div>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokédex
            </Typography>
            <Button
              color="error"
              variant="contained"
              startIcon={<FavoriteIcon />}
            >
              Favoritos
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box mt={2}>
          <h2>Pokémons</h2>
          <Grid container spacing={2}>
            {data?.results.map(pokemon => (
              <Grid key={pokemon.id} item xs={6} lg={3}>
                <PokedexCard pokemon={pokemon} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
