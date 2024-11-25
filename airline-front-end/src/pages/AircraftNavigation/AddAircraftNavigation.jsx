// src/pages/AircraftNavigation/AddAircraftNavigation.jsx
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
import { createAircraftNavigation, getAircraft, getNavigationParameters } from '../../services/api';

function AddAircraftNavigation() {
  const [form, setForm] = useState({
    aircraft_id: '',
    parameter_id: '',
    parameter_value: '',
    installed_date: '',
    last_maintenance_date: '',
  });

  const [aircraft, setAircraft] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [aircraftRes, paramsRes] = await Promise.all([getAircraft(), getNavigationParameters()]);
        setAircraft(aircraftRes.data);
        setParameters(paramsRes.data);
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
    if (!form.aircraft_id || !form.parameter_id || !form.parameter_value || !form.installed_date) {
      setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }
    try {
      await createAircraftNavigation(form);
      setAlert({ open: true, message: 'Aircraft navigation parameter added successfully!', severity: 'success' });
      setTimeout(() => navigate('/aircraft-navigation'), 1500);
    } catch (error) {
      console.error('Error adding aircraft navigation parameter:', error);
      setAlert({ open: true, message: 'Failed to add aircraft navigation parameter.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Aircraft Navigation Parameter
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
          {aircraft.map((ac) => (
            <MenuItem key={ac.aircraft_id} value={ac.aircraft_id}>
              {ac.model} ({ac.airline_name})
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Parameter"
          name="parameter_id"
          value={form.parameter_id}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        >
          {parameters.map((param) => (
            <MenuItem key={param.parameter_id} value={param.parameter_id}>
              {param.parameter_name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Parameter Value"
          name="parameter_value"
          type="number"
          value={form.parameter_value}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Installed Date"
          name="installed_date"
          type="date"
          value={form.installed_date}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Last Maintenance Date"
          name="last_maintenance_date"
          type="date"
          value={form.last_maintenance_date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Aircraft Navigation Parameter
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

export default AddAircraftNavigation;
