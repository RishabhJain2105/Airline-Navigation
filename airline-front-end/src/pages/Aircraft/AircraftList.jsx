// src/pages/Aircraft/AircraftList.jsx
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
import { getAircraft, deleteAircraft } from '../../services/api';

function AircraftList() {
  const [aircraft, setAircraft] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchAircraft = async () => {
    try {
      const response = await getAircraft();
      setAircraft(response.data);
    } catch (error) {
      console.error('Error fetching aircraft:', error);
      setAlert({ open: true, message: 'Failed to fetch aircraft.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchAircraft();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this aircraft?')) {
      try {
        await deleteAircraft(id);
        setAircraft(aircraft.filter((ac) => ac.aircraft_id !== id));
        setAlert({ open: true, message: 'Aircraft deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting aircraft:', error);
        setAlert({ open: true, message: 'Failed to delete aircraft.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Aircraft
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/aircraft/add"
        sx={{ marginBottom: 2 }}
      >
        Add Aircraft
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Range (km)</TableCell>
              <TableCell>Airline Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircraft.map((ac) => (
              <TableRow key={ac.aircraft_id}>
                <TableCell>{ac.aircraft_id}</TableCell>
                <TableCell>{ac.model}</TableCell>
                <TableCell>{ac.manufacturer}</TableCell>
                <TableCell>{ac.capacity}</TableCell>
                <TableCell>{ac.range}</TableCell>
                <TableCell>{ac.airline_name}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/aircraft/edit/${ac.aircraft_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(ac.aircraft_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {aircraft.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No aircraft found.
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

export default AircraftList;
