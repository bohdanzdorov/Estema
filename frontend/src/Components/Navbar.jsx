import * as React from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={props.openMainPage} variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Estema Language
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}