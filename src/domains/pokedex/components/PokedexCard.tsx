import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  IconButton,
  styled,
  Typography
} from '@mui/material'
import { Favorite, MoreVert, Share } from '@mui/icons-material'
import { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { PokemonDetail } from '../../pokemon/interfaces/PokemonDetail'

interface PokedexCardProps {
  pokemon: PokemonDetail
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

// const Card = styled.section`
//   padding: 4rem;
//   border-radius: 0.5rem;
//   background: papayawhip;
// `

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

export const PokedexCard: React.FC<PokedexCardProps> = ({ pokemon }) => {
  const navigate = useNavigate()

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  function handleClick() {
    navigate(`/pokemon/${pokemon.name}`)
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="276"
          image={pokemon.sprites.front_default}
          alt="Icone do pokemon no card"
        />
        <CardHeader
          title={pokemon.name}
          subheader={pokemon.types.map(type => (
            <Chip label={type.type.name} variant="outlined" />
          ))}
        />
      </Card>
    </>
  )
}
