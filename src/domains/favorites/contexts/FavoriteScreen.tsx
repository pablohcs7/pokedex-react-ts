import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React from 'react'

interface FavoriteScreenProps {}

export const FavoriteScreen: React.FC<FavoriteScreenProps> = () => {
  return (
    <div>
      <Box>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Favoritos
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
