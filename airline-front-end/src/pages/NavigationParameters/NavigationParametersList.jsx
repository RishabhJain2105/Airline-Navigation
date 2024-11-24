// src/pages/NavigationParameters/NavigationParametersList.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { getNavigationParameters, deleteNavigationParameter } from '../../services/api';

function NavigationParametersList() {
  const [parameters, setParameters] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchParameters = async () => {
    try {
      const response = await getNavigationParameters();
      setParameters(response.data);
    } catch (error) {
      console.error('Error fetching navigation parameters:', error);
      setAlert({ open: true, message: 'Failed to fetch navigation parameters.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this navigation parameter?')) {
      try {
        await deleteNavigationParameter(id);
        setParameters(parameters.filter((param) => param.parameter_id !== id));
        setAlert({ open: true, message: 'Navigation parameter deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting navigation parameter:', error);
        setAlert({ open: true, message: 'Failed to delete navigation parameter.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Navigation Parameters
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/navigation-parameters/add"
        sx={{ marginBottom: 2 }}
      >
        Add Navigation Parameter
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Parameter Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((param) => (
              <TableRow key={param.parameter_id}>
                <TableCell>{param.parameter_id}</TableCell>
                <TableCell>{param.parameter_name}</TableCell>
                <TableCell>{param.unit}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/navigation-parameters/edit/${param.parameter_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(param.parameter_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {parameters.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No navigation parameters found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

export default NavigationParametersList;
