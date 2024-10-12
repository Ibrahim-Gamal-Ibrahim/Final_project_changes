import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c3e50' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ mr: 2 }}>
            Election App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#ecf0f1' }}>Home</Button>
          <Button color="inherit" component={Link} to="/candidates" sx={{ color: '#ecf0f1' }}>Candidates</Button>
          <Button color="inherit" component={Link} to="/vote" sx={{ color: '#ecf0f1' }}>Vote</Button>
          <Button color="inherit" component={Link} to="/results" sx={{ color: '#ecf0f1' }}>Results</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
