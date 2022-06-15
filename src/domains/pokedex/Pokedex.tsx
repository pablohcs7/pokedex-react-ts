import React from 'react'

import { listPokemons } from '../pokemon/services/listPokemons'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Grid } from '@mui/material'
import { PokedexCard } from './components/PokedexCard'

import { useQuery } from 'react-query'

export const Pokedex: React.FC = () => {
  const { data } = useQuery(`listPokemons`, listPokemons)

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
            {data?.results.map(pokemon => (
              <>
                <Grid item xs={6} lg={3}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              </>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  )
}
