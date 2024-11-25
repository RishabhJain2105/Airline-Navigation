// src/pages/NavigationParameters/EditNavigationParameter.jsx
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
import { getNavigationParameterById, updateNavigationParameter } from '../../services/api';

function EditNavigationParameter() {
  const { id } = useParams();
  const [form, setForm] = useState({
    parameter_name: '',
    unit: '',
  });

  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchParameter = async () => {
      try {
        const response = await getNavigationParameterById(id);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching navigation parameter:', error);
        setAlert({ open: true, message: 'Failed to fetch navigation parameter details.', severity: 'error' });
      }
    };
    fetchParameter();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.parameter_name || !form.unit) {
      setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }
    try {
      await updateNavigationParameter(id, form);
      setAlert({ open: true, message: 'Navigation parameter updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/navigation-parameters'), 1500);
    } catch (error) {
      console.error('Error updating navigation parameter:', error);
      setAlert({ open: true, message: 'Failed to update navigation parameter.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Edit Navigation Parameter
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Parameter Name"
          name="parameter_name"
          value={form.parameter_name}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Unit"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Navigation Parameter
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

export default EditNavigationParameter;
