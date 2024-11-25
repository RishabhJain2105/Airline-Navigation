// src/pages/AircraftNavigation/AircraftNavigationList.jsx
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
import { getAircraftNavigation, deleteAircraftNavigation, getAircraft, getNavigationParameters } from '../../services/api';

function AircraftNavigationList() {
  const [aircraftNavigation, setAircraftNavigation] = useState([]);
  const [aircraft, setAircraft] = useState({});
  const [parameters, setParameters] = useState({});
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    try {
      const [navRes, aircraftRes, paramsRes] = await Promise.all([
        getAircraftNavigation(),
        getAircraft(),
        getNavigationParameters(),
      ]);
      setAircraftNavigation(navRes.data);
      // Create mappings
      const aircraftMap = {};
      aircraftRes.data.forEach((ac) => {
        aircraftMap[ac.aircraft_id] = `${ac.model} (${ac.airline_name})`;
      });
      setAircraft(aircraftMap);

      const paramsMap = {};
      paramsRes.data.forEach((param) => {
        paramsMap[param.parameter_id] = param.parameter_name;
      });
      setParameters(paramsMap);
    } catch (error) {
      console.error('Error fetching aircraft navigation data:', error);
      setAlert({ open: true, message: 'Failed to fetch aircraft navigation data.', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this aircraft navigation entry?')) {
      try {
        await deleteAircraftNavigation(id);
        setAircraftNavigation(aircraftNavigation.filter((nav) => nav.navigation_id !== id));
        setAlert({ open: true, message: 'Aircraft navigation entry deleted successfully.', severity: 'success' });
      } catch (error) {
        console.error('Error deleting aircraft navigation entry:', error);
        setAlert({ open: true, message: 'Failed to delete aircraft navigation entry.', severity: 'error' });
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Aircraft Navigation Parameters
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/aircraft-navigation/add"
        sx={{ marginBottom: 2 }}
      >
        Add Aircraft Navigation
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Aircraft</TableCell>
              <TableCell>Parameter</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Installed Date</TableCell>
              <TableCell>Last Maintenance Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircraftNavigation.map((nav) => (
              <TableRow key={nav.navigation_id}>
                <TableCell>{nav.navigation_id}</TableCell>
                <TableCell>{aircraft[nav.aircraft_id]}</TableCell>
                <TableCell>{parameters[nav.parameter_id]}</TableCell>
                <TableCell>{nav.parameter_value}</TableCell>
                <TableCell>{new Date(nav.installed_date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(nav.last_maintenance_date).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`/aircraft-navigation/edit/${nav.navigation_id}`}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(nav.navigation_id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {aircraftNavigation.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No aircraft navigation parameters found.
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

export default AircraftNavigationList;
