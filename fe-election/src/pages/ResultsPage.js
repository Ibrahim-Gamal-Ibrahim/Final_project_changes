import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Avatar, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axiosInstance from '../api/axiosConfig';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axiosInstance.get('/api/vote/results')
      .then(response => {
        const sortedResults = response.data.filter(candidate => candidate.votes > 0).sort((a, b) => b.votes - a.votes);
        setResults(sortedResults);
      })
      .catch(error => console.error('Error fetching results:', error));
  }, []);

  const topThree = results.slice(0, 3);

  // Check if the top candidate is unique or if there's a tie for the top spot
  const isWinnerUnique = topThree.length > 1 && topThree[0].votes !== topThree[1].votes;

  const data = {
    labels: topThree.map(candidate => candidate.name),
    datasets: [
      {
        label: 'Votes',
        data: topThree.map(candidate => candidate.votes),
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 3 Candidates Vote Distribution',
      },
    },
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Election Results</Typography>
      {results.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No votes have been cast yet.</Typography>
      ) : (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="flex-start">
          <Box width={{ xs: '100%', md: '70%' }}>
            <Box width="100%" height={400}>
              <Bar data={data} options={options} />
            </Box>
          </Box>
          <Box width={{ xs: '100%', md: '28%' }} mt={{ xs: 4, md: 0 }} pl={{ md: 2 }}>
            <Typography variant="h5" gutterBottom>Top Candidates</Typography>
            <Grid container spacing={3}>
              {topThree.map((candidate, index) => (
                <Grid item key={candidate.id} xs={12} sm={6} md={6}>
                  <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <Avatar
                      src={`data:image/jpeg;base64,${candidate.photo}`}
                      alt={candidate.name}
                      sx={{ width: 70, height: 70, marginBottom: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontSize: '1rem', textAlign: 'center' }}>{candidate.name}</Typography>
                    <Typography variant="body2" color="textSecondary">Votes: {candidate.votes}</Typography>
                    {index === 0 && isWinnerUnique && (
                      <Typography variant="body1" color="secondary" sx={{ fontSize: '0.875rem' }}>Winner</Typography>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default ResultsPage;
