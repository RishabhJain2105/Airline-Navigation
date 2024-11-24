// src/pages/Aircraft/EditAircraft.jsx
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
import { getAircraftById, updateAircraft } from '../../services/api';

function EditAircraft() {
  const { id } = useParams();
  const [form, setForm] = useState({
    model: '',
    manufacturer: '',
    capacity: '',
    range: '',
    airline_name: '',
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const response = await getAircraftById(id);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching aircraft:', error);
        setAlert({ open: true, message: 'Failed to fetch aircraft details.', severity: 'error' });
      }
    };
    fetchAircraft();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.model || !form.manufacturer || !form.capacity || !form.range || !form.airline_name) {
      setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }
    try {
      await updateAircraft(id, form);
      setAlert({ open: true, message: 'Aircraft updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/aircraft'), 1500);
    } catch (error) {
      console.error('Error updating aircraft:', error);
      setAlert({ open: true, message: 'Failed to update aircraft.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Aircraft
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
          Update Aircraft
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

export default EditAircraft;
