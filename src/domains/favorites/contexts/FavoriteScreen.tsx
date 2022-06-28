import React, { useContext } from 'react'

import Box from '@mui/material/Box'

import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material'

import { FavoriteContext } from './FavoriteContext'
import { PokedexCard } from '../../pokedex/components/PokedexCard'

export const FavoriteScreen: React.FC = () => {
  const { favorites } = useContext(FavoriteContext)

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              Pokémons Favoritos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="lg">
        <Box mt={2}>
          <h2>Pokémons</h2>
          <Grid container spacing={2}>
            {favorites?.map(pokemon => (
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
