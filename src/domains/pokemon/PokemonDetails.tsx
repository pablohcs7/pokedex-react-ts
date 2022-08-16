import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Chip,
  Divider,
  LinearProgress,
  CircularProgress
} from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetails } from './services/getPokemonDetails'
import { useQuery } from 'react-query'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FavoriteContext } from '../favorites/contexts/FavoriteContext'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { setFirstLetterUppercase } from './services/setFirstLetterUppercase'
import { setBackgroundColor } from './services/setBackgroundColor'

interface PokemonDetailsProps {}

export const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext)
  const navigate = useNavigate()

  const { name } = useParams()

  const { data } = useQuery(`getPokemonDetails-${name}`, () =>
    getPokemonDetails(name)
  )

  function goBack() {
    navigate('/')
  }
  const selectedPokemonDetails = data

  const addPokemonToFavorite = () => {
    if (!selectedPokemonDetails) return
    setFavorites([...favorites, selectedPokemonDetails])
  }

  const removePokemonFromFavorites = () => {
    if (!selectedPokemonDetails) return

    setFavorites(
      favorites.filter((poke) => poke.name !== selectedPokemonDetails.name)
    )
  }

  const isFavorite = favorites.some(
    (poke) => poke.name === selectedPokemonDetails?.name
  )

  return (
    <Typography
      component="div"
      sx={{
        minHeight: '100vh',
        backgroundColor: `${setBackgroundColor(selectedPokemonDetails?.types)}`,
        paddingBottom: '2rem'
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#F2B807'
          }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton
              onClick={goBack}
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: 'white' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              component="img"
              src="../src/domains/assets/pokemon-logo.png"
              sx={{ width: '100px' }}
            />
            <IconButton
              onClick={() =>
                isFavorite
                  ? removePokemonFromFavorites()
                  : addPokemonToFavorite()
              }
              aria-label="add to favorites"
            >
              <FavoriteIcon
                color={isFavorite ? 'error' : 'disabled'}
                sx={{ ':hover': { color: '#D93E30', transition: '0.3s' } }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '2rem'
          }}
        >
          <Typography variant="h3">
            {`#${selectedPokemonDetails?.id}. ${setFirstLetterUppercase(
              selectedPokemonDetails?.name
            )}`}
          </Typography>

          <Box sx={{ mt: '0.5rem' }}>
            {selectedPokemonDetails?.types.map((type, index) => (
              <Chip
                key={index}
                label={setFirstLetterUppercase(type.type.name)}
                sx={{
                  marginRight: 1,
                  boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.40)',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}
              />
            ))}
          </Box>

          <Typography
            component="img"
            src={
              selectedPokemonDetails?.sprites.versions?.['generation-v'][
                'black-white'
              ].animated?.front_default
            }
            alt="Imagem do pokemon selecionado"
            sx={{ width: '175px', mt: '2rem' }}
          />
        </Box>

        <Divider
          variant="middle"
          sx={{ mb: '4rem', mt: '4rem', backgroundColor: '' }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
            padding: '1rem',
            backgroundColor: 'white',
            gap: '1.5rem'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
              borderRadius: '10px',
              padding: '1rem',
              gap: '0.3rem',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              SKILLS
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '1rem'
              }}
            >
              {selectedPokemonDetails?.abilities.map((ability, index) => (
                <Typography key={index}>
                  {setFirstLetterUppercase(ability.ability.name)}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
              borderRadius: '10px',
              padding: '1rem',
              gap: '0.3rem',
              alignItems: 'center'
            }}
          >
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
              BASE STATS
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: '4rem',
                alignItems: 'center'
              }}
            >
              <Box
                display="flex"
                sx={{ alignItems: 'center', gap: '0.5rem', minWidth: '100%' }}
              >
                <Typography>
                  <b>HP:</b>
                </Typography>

                <LinearProgress
                  variant="determinate"
                  value={selectedPokemonDetails?.stats[1].base_stat}
                  color="error"
                  sx={{
                    width: '100%',
                    height: '0.5rem',
                    borderRadius: '10px'
                  }}
                />

                <Typography>
                  <b>{selectedPokemonDetails?.stats[1].base_stat}</b>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '70%'
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '7rem',
                      boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
                      borderRadius: '10px',
                      alignItems: 'center',
                      padding: '0.5rem',
                      mb: '1rem'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        color="secondary"
                        value={100}
                      />
                      <Typography sx={{ position: 'absolute' }}>
                        <b> {selectedPokemonDetails?.stats[2].base_stat}</b>
                      </Typography>
                    </Box>
                    <Typography>Attack</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '7rem',
                      boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
                      borderRadius: '10px',
                      alignItems: 'center',
                      padding: '0.5rem'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        color="primary"
                        value={100}
                      />
                      <Typography sx={{ position: 'absolute' }}>
                        <b> {selectedPokemonDetails?.stats[3].base_stat}</b>
                      </Typography>
                    </Box>
                    <Typography>Defense</Typography>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '7rem',
                      boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
                      borderRadius: '10px',
                      alignItems: 'center',
                      padding: '0.5rem',
                      mb: '1rem'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        color="warning"
                        value={100}
                      />
                      <Typography sx={{ position: 'absolute' }}>
                        <b> {selectedPokemonDetails?.stats[4].base_stat}</b>
                      </Typography>
                    </Box>
                    <Typography>SP Attack</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '7rem',
                      boxShadow: '5px 5px 20px -6px rgba(0,0,0,0.65)',
                      borderRadius: '10px',
                      alignItems: 'center',
                      padding: '0.5rem'
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CircularProgress
                        variant="determinate"
                        color="success"
                        value={100}
                      />
                      <Typography sx={{ position: 'absolute' }}>
                        <b> {selectedPokemonDetails?.stats[5].base_stat}</b>
                      </Typography>
                    </Box>
                    <Typography>SP Defense</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Typography>
  )
}
