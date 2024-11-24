// src/pages/Routes/AddRoute.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createRoute, getAirports } from '../../services/api';

function AddRoute() {
  const [form, setForm] = useState({
    departure_airport: '',
    arrival_airport: '',
    waypoints: '',
    distance: '',
  });

  const [airports, setAirports] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await getAirports();
        setAirports(response.data);
      } catch (error) {
        console.error('Error fetching airports:', error);
        setAlert({ open: true, message: 'Failed to fetch airports.', severity: 'error' });
      }
    };
    fetchAirports();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.departure_airport || !form.arrival_airport) {
      setAlert({ open: true, message: 'Departure and Arrival Airports are required.', severity: 'warning' });
      return;
    }
    if (form.departure_airport === form.arrival_airport) {
      setAlert({ open: true, message: 'Departure and Arrival Airports cannot be the same.', severity: 'warning' });
      return;
    }
    try {
      await createRoute(form);
      setAlert({ open: true, message: 'Route added successfully!', severity: 'success' });
      setTimeout(() => navigate('/routes'), 1500);
    } catch (error) {
      console.error('Error adding route:', error);
      setAlert({ open: true, message: 'Failed to add route.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Route
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          select
          label="Departure Airport"
          name="departure_airport"
          value={form.departure_airport}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {airports.map((airport) => (
            <MenuItem key={airport.airport_id} value={airport.airport_id}>
              {airport.airport_name} ({airport.IATA_code})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Arrival Airport"
          name="arrival_airport"
          value={form.arrival_airport}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {airports.map((airport) => (
            <MenuItem key={airport.airport_id} value={airport.airport_id}>
              {airport.airport_name} ({airport.IATA_code})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Waypoints"
          name="waypoints"
          value={form.waypoints}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />

        <TextField
          label="Distance (km)"
          name="distance"
          type="number"
          value={form.distance}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Route
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

export default AddRoute;
