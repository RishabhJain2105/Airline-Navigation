// src/pages/Airports/AirportsList.jsx
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
import { getAirports, deleteAirport } from '../../services/api';

function AirportsList() {
  const [airports, setAirports] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchAirports = async () => {
    try {
      const response = await getAirports();
      setAirports(response.data);
    } catch (error) {
      console.error('Error fetching airports:', error);
      setAlert({ open: true, message: '-10000 AURA', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this airport?')) {
      try {
        await deleteAirport(id);
        setAirports(airports.filter((airport) => airport.airport_id !== id));
        setAlert({ open: true, message: 'Airport deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting airport:', error);
        setAlert({ open: true, message: 'Failed to delete airport.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Airports
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/airports/add"
        sx={{ marginBottom: 2 }}
      >
        Add Airport
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Airport Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>IATA Code</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {airports.map((airport) => (
              <TableRow key={airport.airport_id}>
                <TableCell>{airport.airport_id}</TableCell>
                <TableCell>{airport.airport_name}</TableCell>
                <TableCell>{airport.city}</TableCell>
                <TableCell>{airport.country}</TableCell>
                <TableCell>{airport.IATA_code}</TableCell>
                <TableCell>{airport.latitude}</TableCell>
                <TableCell>{airport.longitude}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/airports/edit/${airport.airport_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(airport.airport_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {airports.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No airports found.
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

export default AirportsList;
