import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, IconButton, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Tooltip } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import axiosInstance from '../api/axiosConfig';

const CandidatePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    photo: null,
    party: '',
    age: '',
    experience: ''
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = () => {
    axiosInstance.get('/api/candidate')
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('photo', formData.photo);
    data.append('party', formData.party);
    data.append('age', formData.age);
    data.append('experience', formData.experience);

    axiosInstance.post('/api/candidate/add', data)
      .then(() => {
        fetchCandidates(); // Refresh the candidate list
        setFormData({
          name: '',
          photo: null,
          party: '',
          age: '',
          experience: ''
        });
        setOpen(false); // Close the dialog after submission
      })
      .catch(error => console.error('Error adding candidate:', error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCandidate = (id) => {
    axiosInstance.delete(`/api/candidate/${id}`)
      .then(() => setCandidates(candidates.filter(candidate => candidate.id !== id)))
      .catch(error => console.error('Error deleting candidate:', error));
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold">Candidate List</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClickOpen}
          sx={{ textTransform: 'none', borderRadius: '20px', paddingX: 3, paddingY: 1 }}
        >
          Add New Candidate
        </Button>
      </Box>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Add New Candidate</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Fill out the form below to add a new candidate.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              type="file"
              name="photo"
              onChange={handleFileChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Party"
              name="party"
              value={formData.party}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Experience"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="secondary">Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{ textTransform: 'none', borderRadius: '10px' }}
              >
                Add Candidate
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {candidates.length === 0 ? (
        <Typography variant="h6" color="textSecondary" textAlign="center" sx={{ mt: 4 }}>
          No candidates available. Please add a candidate.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 2, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Photo</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Name</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Party</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Age</Typography></TableCell>
                <TableCell><Typography variant="subtitle1" fontWeight="bold">Experience</Typography></TableCell>
                <TableCell align="center"><Typography variant="subtitle1" fontWeight="bold">Actions</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map(candidate => (
                <TableRow 
                  key={candidate.id} 
                  sx={{
                    '&:hover': { backgroundColor: '#f0f8ff' },
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <TableCell>
                    <Avatar 
                      src={`data:image/jpeg;base64,${candidate.photo}`} 
                      alt={candidate.name} 
                      sx={{ width: 48, height: 48 }} 
                    />
                  </TableCell>
                  <TableCell>{candidate.name}</TableCell>
                  <TableCell>{candidate.party}</TableCell>
                  <TableCell>{candidate.age}</TableCell>
                  <TableCell>{candidate.experience}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Delete Candidate">
                      <IconButton color="error" onClick={() => deleteCandidate(candidate.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CandidatePage;
