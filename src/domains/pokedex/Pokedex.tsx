import React, { ChangeEvent, useContext, useState } from 'react'

import { listPokemons } from '../pokemon/services/listPokemons'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Badge, Button, Container, Grid, Pagination } from '@mui/material'
import { PokedexCard } from './components/PokedexCard'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'

export const Pokedex: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(0)

  const { favorites } = useContext(FavoriteContext)

  const { data } = useQuery(`listPokemons`, listPokemons)

  const navigate = useNavigate()

  function handleClick() {
    navigate('/favoritos')
  }

  const totalPokemons: number = Number(data?.results.length)

  const pokemonsPerPage = 12
  const pagesVisited = pageNumber * pokemonsPerPage
  const displayPokemons = data?.results
    .slice(pagesVisited, pagesVisited + pokemonsPerPage)
    .map((pokemon) => (
      <Grid key={pokemon.id} item xs={6} lg={3}>
        <PokedexCard pokemon={pokemon} />
      </Grid>
    ))

  const handlePage = (event: ChangeEvent<unknown>, page: number) => {
    setPageNumber(page - 1)
  }

  const favoritesCount = favorites.length

  return (
    <div>
      <Box>
        <AppBar position="static" sx={{ backgroundColor: '#F2B807' }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              component="img"
              src="https://raw.githubusercontent.com/pablohcs7/pokedex-react-ts/main/src/domains/assets/pokemon-logo.png"
              sx={{ width: '100px' }}
            ></Typography>
            <Badge badgeContent={favoritesCount} color="error">
              <Button
                onClick={handleClick}
                variant="contained"
                sx={{
                  backgroundColor: '#D93E30',
                  ':hover': { backgroundColor: '#DC4E41' }
                }}
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
            'url("https://raw.githubusercontent.com/pablohcs7/pokedex-react-ts/0d9c1b83d0b29f79e83ed3ae0d6207a59b1611f2/src/domains/pokedex/components/assets/pokeball-background.svg")',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="lg">
          <h2>Pokémons</h2>
          <Box mt={2}>
            <Grid container spacing={6}>
              {displayPokemons}
            </Grid>
          </Box>
          <Typography
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1rem'
            }}
          >
            <Pagination
              count={Math.ceil(totalPokemons / pokemonsPerPage)}
              onChange={handlePage}
              defaultPage={1}
            />
          </Typography>
        </Container>
      </Typography>
    </div>
  )
}
