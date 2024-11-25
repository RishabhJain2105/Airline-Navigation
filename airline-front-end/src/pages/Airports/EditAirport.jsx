// src/pages/Airports/EditAirport.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getAirportById, updateAirport } from '../../services/api';

function EditAirport() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        const response = await getAirportById(id);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching airport:', error);
        setAlert({ open: true, message: 'Failed to fetch airport details.', severity: 'error' });
      }
    };
    fetchAirport();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.airport_name) {
      setAlert({ open: true, message: 'Airport name is required.', severity: 'warning' });
      return;
    }
    try {
      await updateAirport(id, form);
      setAlert({ open: true, message: 'Airport updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/airports'), 1500);
    } catch (error) {
      console.error('Error updating airport:', error);
      setAlert({ open: true, message: 'Failed to update airport.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Airport
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
          Update Airport
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

export default EditAirport;
