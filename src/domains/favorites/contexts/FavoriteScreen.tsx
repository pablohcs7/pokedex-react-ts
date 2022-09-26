import React, { useContext } from 'react'

import Box from '@mui/material/Box'

import {
  AppBar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { FavoriteContext } from './FavoriteContext'
import { PokedexCard } from '../../pokedex/components/PokedexCard'
import { useNavigate } from 'react-router-dom'

export const FavoriteScreen: React.FC = () => {
  const { favorites } = useContext(FavoriteContext)
  const navigate = useNavigate()

  function goBack() {
    navigate('/')
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#F2B807' }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <IconButton
              onClick={goBack}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              component="img"
              src="https://raw.githubusercontent.com/pablohcs7/pokedex-react-ts/main/src/domains/assets/pokemon-logo.png"
              sx={{ width: '100px' }}
            />
            <FavoriteIcon sx={{ opacity: '0' }} />
          </Toolbar>
        </AppBar>
      </Box>
      <Typography
        component="div"
        sx={{
          backgroundImage:
            'url("https://raw.githubusercontent.com/pablohcs7/pokedex-react-ts/0d9c1b83d0b29f79e83ed3ae0d6207a59b1611f2/src/domains/pokedex/components/assets/pokeball-background.svg")',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg">
          <Box mt={2}>
            <Grid container spacing={2}>
              {favorites?.map((pokemon) => (
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
