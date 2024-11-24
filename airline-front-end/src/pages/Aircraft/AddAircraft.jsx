// src/pages/Aircraft/AddAircraft.jsx
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
import { createAircraft } from '../../services/api';

function AddAircraft() {
  const [form, setForm] = useState({
    model: '',
    manufacturer: '',
    capacity: '',
    range: '',
    airline_name: '',
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.model || !form.manufacturer || !form.capacity || !form.range || !form.airline_name) {
      setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }
    try {
      await createAircraft(form);
      setAlert({ open: true, message: 'Aircraft added successfully!', severity: 'success' });
      setTimeout(() => navigate('/aircraft'), 1500);
    } catch (error) {
      console.error('Error adding aircraft:', error);
      setAlert({ open: true, message: 'Failed to add aircraft.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Aircraft
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Model"
          name="model"
          value={form.model}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Manufacturer"
          name="manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Range (km)"
          name="range"
          type="number"
          value={form.range}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Airline Name"
          name="airline_name"
          value={form.airline_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Aircraft
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

export default AddAircraft;
