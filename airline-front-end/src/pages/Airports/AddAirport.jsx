// src/pages/Airports/AddAirport.jsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createAirport } from '../../services/api';

function AddAirport() {
  const [form, setForm] = useState({
    airport_name: '',
    city: '',
    country: '',
    IATA_code: '',
    latitude: '',
    longitude: '',
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.airport_name) {
      setAlert({ open: true, message: 'Airport name is required.', severity: 'warning' });
      return;
    }
    try {
      await createAirport(form);
      setAlert({ open: true, message: 'Airport added successfully!', severity: 'success' });
      setTimeout(() => navigate('/airports'), 1500);
    } catch (error) {
      console.error('Error adding airport:', error);
      setAlert({ open: true, message: 'Failed to add airport.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Airport
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Airport Name"
          name="airport_name"
          value={form.airport_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="IATA Code"
          name="IATA_code"
          value={form.IATA_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Latitude"
          name="latitude"
          type="number"
          value={form.latitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          name="longitude"
          type="number"
          value={form.longitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Airport
        </Button>
      </Box>

      {/* Snackbar for alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AddAirport;
