// src/pages/Routes/EditRoute.jsx
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
import { useNavigate, useParams } from 'react-router-dom';
import { getRouteById, updateRoute, getAirports } from '../../services/api';

function EditRoute() {
  const { id } = useParams();
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
    const fetchRouteAndAirports = async () => {
      try {
        const [routeRes, airportsRes] = await Promise.all([getRouteById(id), getAirports()]);
        setForm(routeRes.data);
        setAirports(airportsRes.data);
      } catch (error) {
        console.error('Error fetching route:', error);
        setAlert({ open: true, message: 'Failed to fetch route details.', severity: 'error' });
      }
    };
    fetchRouteAndAirports();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.departure_airport || !form.arrival_airport) {
      setAlert({ open: true, message: 'Departure and Arrival Airports are required.', severity: 'warning' });
      return;
    }
    if (form.departure_airport === form.arrival_airport) {
      setAlert({ open: true, message: 'Departure and Arrival Airports cannot be the same.', severity: 'warning' });
      return;
    }
    try {
      await updateRoute(id, form);
      setAlert({ open: true, message: 'Route updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/routes'), 1500);
    } catch (error) {
      console.error('Error updating route:', error);
      setAlert({ open: true, message: 'Failed to update route.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Route
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
          Update Route
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

export default EditRoute;
