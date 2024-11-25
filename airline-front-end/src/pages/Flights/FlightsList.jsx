// src/pages/Flights/FlightsList.jsx
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
import { getFlights, deleteFlight, getAircraft, getRoutes } from '../../services/api';

function FlightsList() {
  const [flights, setFlights] = useState([]);
  const [aircraftMap, setAircraftMap] = useState({});
  const [routesMap, setRoutesMap] = useState({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    try {
      const [flightsRes, aircraftRes, routesRes] = await Promise.all([
        getFlights(),
        getAircraft(),
        getRoutes(),
      ]);
      setFlights(flightsRes.data);

      const aircraftMapping = {};
      aircraftRes.data.forEach((ac) => {
        aircraftMapping[ac.aircraft_id] = `${ac.model} (${ac.airline_name})`;
      });
      setAircraftMap(aircraftMapping);

      const routesMapping = {};
      routesRes.data.forEach((route) => {
        routesMapping[route.route_id] = `Route ${route.route_id}: ${route.departure_airport} to ${route.arrival_airport}`;
      });
      setRoutesMap(routesMapping);
    } catch (error) {
      console.error('Error fetching flights:', error);
      setAlert({ open: true, message: 'Failed to fetch flights.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await deleteFlight(id);
        setFlights(flights.filter((flight) => flight.flight_id !== id));
        setAlert({ open: true, message: 'Flight deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting flight:', error);
        setAlert({ open: true, message: 'Failed to delete flight.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Flights
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/flights/add"
        sx={{ marginBottom: 2 }}
      >
        Add Flight
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flight ID</TableCell>
              <TableCell>Aircraft</TableCell>
              <TableCell>Route</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Arrival Time</TableCell>
              <TableCell>Duration (hrs)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.flight_id}>
                <TableCell>{flight.flight_id}</TableCell>
                <TableCell>{aircraftMap[flight.aircraft_id]}</TableCell>
                <TableCell>{routesMap[flight.route_id]}</TableCell>
                <TableCell>{new Date(flight.departure_time).toLocaleString()}</TableCell>
                <TableCell>{new Date(flight.arrival_time).toLocaleString()}</TableCell>
                <TableCell>{flight.flight_duration}</TableCell>
                <TableCell>{flight.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/flights/edit/${flight.flight_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(flight.flight_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {flights.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No flights found.
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

export default FlightsList;
