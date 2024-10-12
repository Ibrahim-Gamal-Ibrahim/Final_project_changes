import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 10, mb: 10 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
        Welcome to the Election App
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: '#34495e', lineHeight: 1.6 }}>
        Your one-stop platform for managing election candidates and their details.
      </Typography>
      <Box mt={5}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3498db', color: '#fff', padding: '12px 24px', fontSize: '16px' }}
              component={Link}
              to="/candidates"
            >
              View Candidates
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              sx={{ borderColor: '#3498db', color: '#3498db', padding: '12px 24px', fontSize: '16px' }}
              component={Link}
              to="/about"
            >
              Learn More
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5} sx={{ color: '#7f8c8d' }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Election App. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
