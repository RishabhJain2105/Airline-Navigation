// src/pages/Flights/AddFlight.jsx
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
import { createFlight, getAircraft, getRoutes } from '../../services/api';

function AddFlight() {
  const [form, setForm] = useState({
    aircraft_id: '',
    route_id: '',
    departure_time: '',
    arrival_time: '',
    flight_duration: '',
    status: 'Scheduled',
  });

  const [aircraftOptions, setAircraftOptions] = useState([]);
  const [routeOptions, setRouteOptions] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [aircraftRes, routesRes] = await Promise.all([getAircraft(), getRoutes()]);
        setAircraftOptions(aircraftRes.data);
        setRouteOptions(routesRes.data);
      } catch (error) {
        console.error('Error fetching options:', error);
        setAlert({ open: true, message: 'Failed to fetch dropdown options.', severity: 'error' });
      }
    };
    fetchOptions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.aircraft_id || !form.route_id || !form.departure_time || !form.arrival_time) {
      setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }

    // Calculate flight duration in hours
    const departure = new Date(form.departure_time);
    const arrival = new Date(form.arrival_time);
    const duration = (arrival - departure) / (1000 * 60 * 60); // duration in hours

    if (duration <= 0) {
      setAlert({ open: true, message: 'Arrival time must be after departure time.', severity: 'warning' });
      return;
    }

    const flightData = {
      ...form,
      flight_duration: duration,
    };

    try {
      await createFlight(flightData);
      setAlert({ open: true, message: 'Flight added successfully!', severity: 'success' });
      setTimeout(() => navigate('/flights'), 1500);
    } catch (error) {
      console.error('Error adding flight:', error);
      setAlert({ open: true, message: 'Failed to add flight.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Flight
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          select
          label="Aircraft"
          name="aircraft_id"
          value={form.aircraft_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {aircraftOptions.map((aircraft) => (
            <MenuItem key={aircraft.aircraft_id} value={aircraft.aircraft_id}>
              {aircraft.model} ({aircraft.airline_name})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Route"
          name="route_id"
          value={form.route_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {routeOptions.map((route) => (
            <MenuItem key={route.route_id} value={route.route_id}>
              Route {route.route_id}: {route.departure_airport} to {route.arrival_airport}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Departure Time"
          name="departure_time"
          type="datetime-local"
          value={form.departure_time}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Arrival Time"
          name="arrival_time"
          type="datetime-local"
          value={form.arrival_time}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="Scheduled">Scheduled</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
          <MenuItem value="Delayed">Delayed</MenuItem>
        </TextField>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Flight
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

export default AddFlight;
