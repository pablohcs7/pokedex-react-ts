import React, { useContext } from 'react'

import { listPokemons } from '../pokemon/services/listPokemons'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Badge, Button, Container, Grid } from '@mui/material'
import { PokedexCard } from './components/PokedexCard'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'


export const Pokedex: React.FC = () => {
  const { favorites } = useContext(FavoriteContext)

  const { data } = useQuery(`listPokemons`, listPokemons)

  const navigate = useNavigate()

  function handleClick() {
    navigate('/favoritos')
  }

  const favoritesCount = favorites.length

  return (
    <div>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: '#0075BE' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" component="div" sx={{ width: '100px' }}>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi.svg?sanitize=true"
                alt="PokeApi icon"
              />
            </Typography>
            <Badge badgeContent={favoritesCount} color="error">
              <Button
                color="error"
                onClick={handleClick}
                variant="contained"
                startIcon={<FavoriteIcon />}
              >
                Favoritos
              </Button>
            </Badge>
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        component="div"
        sx={{
          backgroundImage:
            'url("src/domains/pokedex/components/assets/pokeball-background.svg")',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="lg">
          <h2>Pokémons</h2>
          <Box mt={2}>
            <Grid container spacing={6}>
              {data?.results.map(pokemon => (
                <Grid key={pokemon.id} item xs={6} lg={3}>
                  <PokedexCard pokemon={pokemon} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Typography>
    </div>
  )
}
