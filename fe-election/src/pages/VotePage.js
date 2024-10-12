import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Button, Box, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../api/axiosConfig';

const VotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    axiosInstance.get('/api/candidate')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const handleVote = () => {
    if (selectedCandidate) {
      axiosInstance.post('/api/vote', null, { params: { candidateId: selectedCandidate } })
        .then(() => {
          setOpenSnackbar(true);
          setSelectedCandidate(null); // Reset selection after voting
        })
        .catch(error => console.error('Error voting:', error));
    } else {
      alert('Please select a candidate to vote for.');
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom textAlign="center">Vote for Your Candidate</Typography>
      <Box mt={4}>
        {candidates.length === 0 ? (
          <Typography variant="h6" color="textSecondary" textAlign="center">
            No candidates available for voting. Please check back later.
          </Typography>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            {candidates.map(candidate => (
              <Grid item key={candidate.id} xs={6} sm={4} md={2}>
                <Card
                  onClick={() => setSelectedCandidate(candidate.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 1.5,
                    cursor: 'pointer',
                    borderRadius: 2,
                    boxShadow: selectedCandidate === candidate.id ? '0 0 10px rgba(52, 152, 219, 0.8)' : '0 0 10px rgba(0, 0, 0, 0.1)',
                    border: selectedCandidate === candidate.id ? '2px solid #3498db' : '1px solid rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 0 12px rgba(52, 152, 219, 0.5)',
                    },
                    width: 120, // Make the card smaller
                    height: 110, // Adjust height to fit contents
                  }}
                >
                  <Avatar
                    src={`data:image/jpeg;base64,${candidate.photo}`} // Corrected to use template literal
                    alt={candidate.name}
                    sx={{ width: 48, height: 48, marginBottom: 1 }} // Smaller avatar
                  />
                  <CardContent sx={{ textAlign: 'center', padding: '8px' }}>
                    <Typography variant="subtitle1" fontSize="0.875rem">{candidate.name}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      {candidates.length > 0 && ( // Only show the Vote button if there are candidates
        <Box mt={4} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{
              paddingX: 3,
              paddingY: 1,
              borderRadius: 4,
            }}
            onClick={handleVote}
          >
            Vote
          </Button>
        </Box>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Vote registered successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VotePage;
