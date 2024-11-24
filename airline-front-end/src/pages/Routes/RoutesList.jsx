// src/pages/Routes/RoutesList.jsx
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
import { getRoutes, deleteRoute, getAirports } from '../../services/api';

function RoutesList() {
  const [routes, setRoutes] = useState([]);
  const [airports, setAirports] = useState({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchRoutes = async () => {
    try {
      const [routesRes, airportsRes] = await Promise.all([getRoutes(), getAirports()]);
      setRoutes(routesRes.data);
      // Create a mapping from airport_id to airport_name for display
      const airportMap = {};
      airportsRes.data.forEach((airport) => {
        airportMap[airport.airport_id] = airport.airport_name;
      });
      setAirports(airportMap);
    } catch (error) {
      console.error('Error fetching routes:', error);
      setAlert({ open: true, message: 'Failed to fetch routes.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await deleteRoute(id);
        setRoutes(routes.filter((route) => route.route_id !== id));
        setAlert({ open: true, message: 'Route deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting route:', error);
        setAlert({ open: true, message: 'Failed to delete route.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Routes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/routes/add"
        sx={{ marginBottom: 2 }}
      >
        Add Route
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Departure Airport</TableCell>
              <TableCell>Arrival Airport</TableCell>
              <TableCell>Waypoints</TableCell>
              <TableCell>Distance (km)</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes.map((route) => (
              <TableRow key={route.route_id}>
                <TableCell>{route.route_id}</TableCell>
                <TableCell>{airports[route.departure_airport]}</TableCell>
                <TableCell>{airports[route.arrival_airport]}</TableCell>
                <TableCell>{route.waypoints}</TableCell>
                <TableCell>{route.distance}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/routes/edit/${route.route_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(route.route_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {routes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No routes found.
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

export default RoutesList;
