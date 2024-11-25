// src/components/Flights/dashboardsearch.jsx

import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Container, 
  Typography, 
  Snackbar, 
  Alert, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  IconButton,
  CircularProgress
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { searchFlights, getAircraft, getRoutes, getAirports, deleteFlight } from '../services/api'; // Adjust path as needed
import { Link } from 'react-router-dom';

function DashboardSearch() {
  const [departure, setDeparture] = useState(null); // Selected departure airport object
  const [arrival, setArrival] = useState(null);     // Selected arrival airport object
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [flights, setFlights] = useState([]);
  const [aircraftMap, setAircraftMap] = useState({});
  const [routesMap, setRoutesMap] = useState({});
  const [airports, setAirports] = useState([]);     // List of all airports
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);
  const [loadingAirports, setLoadingAirports] = useState(true); // Loading state for airports

  // Fetch aircraft, routes, and airports mappings on mount
  useEffect(() => {
    const fetchMappings = async () => {
      try {
        const [aircraftRes, routesRes, airportsRes] = await Promise.all([
          getAircraft(),
          getRoutes(),
          getAirports(), // Fetch airports data
        ]);

        console.log('Airports Response:', airportsRes); // Log entire response
        console.log('Airports Data:', airportsRes.data); // Log data array

        // Log the first airport object for inspection
        if (airportsRes.data.length > 0) {
          console.log('First Airport Object:', airportsRes.data[0]);
        }

        // Aircraft Mapping
        const aircraftMapping = {};
        aircraftRes.data.forEach((ac) => {
          aircraftMapping[ac.aircraft_id] = `${ac.model} (${ac.airline_name})`;
        });
        setAircraftMap(aircraftMapping);

        // Routes Mapping
        const routesMapping = {};
        routesRes.data.forEach((route) => {
          routesMapping[route.route_id] = `Route ${route.route_id}: ${route.departure_airport} to ${route.arrival_airport}`;
        });
        setRoutesMap(routesMapping);

        // Airports Data
        setAirports(airportsRes.data);
        setLoadingAirports(false);
      } catch (error) {
        console.error('Error fetching mappings:', error);
        setAlert({ open: true, message: 'Failed to fetch aircraft, routes, or airports data.', severity: 'error' });
        setLoadingAirports(false);
      }
    };

    fetchMappings();
  }, []);

  const handleSearch = async () => {
    if (!departure || !arrival || !start || !end) {
      setAlert({ open: true, message: 'Please fill in all fields.', severity: 'warning' });
      return;
    }

    // Validate date range
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (startDate > endDate) {
      setAlert({ open: true, message: 'Start date cannot be after End date.', severity: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const response = await searchFlights(departure.airport_id, arrival.airport_id, start, end);
      console.log('Search Response:', response);
      console.log('Flights Data:', response.data);
      setFlights(response.data);
      if (response.data.length === 0) {
        setAlert({ open: true, message: 'No flights found.', severity: 'info' });
      }
    } catch (error) {
      console.error('Error searching flights:', error);
      setAlert({ open: true, message: 'Failed to search flights.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (flight_id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;

    try {
      await deleteFlight(flight_id);
      setFlights(flights.filter((flight) => flight.flight_id !== flight_id));
      setAlert({ open: true, message: 'Flight deleted successfully.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting flight:', error);
      setAlert({ open: true, message: 'Failed to delete flight.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Search Flights
      </Typography>
      <Grid container spacing={2} alignItems="center">
        {/* Departure Airport Autocomplete */}
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.airport_name || 'Unnamed Airport'} (${option.id || 'N/A'})`}
            value={departure}
            onChange={(event, newValue) => setDeparture(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Departure Airport" 
                variant="outlined" 
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingAirports ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.airport_id === value.airport_id}
            loading={loadingAirports}
            noOptionsText={loadingAirports ? 'Loading airports...' : 'No airports available'}
          />
        </Grid>

        {/* Arrival Airport Autocomplete */}
        <Grid item xs={12} sm={3}>
          <Autocomplete
            options={airports}
            getOptionLabel={(option) => `${option.airport_name || 'Unnamed Airport'} (${option.airport_id || 'N/A'})`}
            value={arrival}
            onChange={(event, newValue) => setArrival(newValue)}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Arrival Airport" 
                variant="outlined" 
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingAirports ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => option.airport_id === value.airport_id}
            loading={loadingAirports}
            noOptionsText={loadingAirports ? 'Loading airports...' : 'No airports available'}
          />
        </Grid>

        {/* Start Date */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </Grid>

        {/* End Date */}
        <Grid item xs={12} sm={3}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch} 
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} color="inherit" />}
          >
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Grid>
      </Grid>

      {/* Display Flights List */}
      {flights.length > 0 && (
        <Paper style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Flight ID</TableCell>
                <TableCell>Aircraft</TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Departure Time</TableCell>
                <TableCell>Arrival Time</TableCell>
                <TableCell>Duration (hrs)</TableCell>
                <TableCell>Airline Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.flight_id}>
                  <TableCell>{flight.flight_id}</TableCell>
                  <TableCell>{aircraftMap[flight.aircraft_id] || 'N/A'}</TableCell>
                  <TableCell>{routesMap[flight.route_id] || 'N/A'}</TableCell>
                  <TableCell>{new Date(flight.departure_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(flight.arrival_time).toLocaleString()}</TableCell>
                  <TableCell>{flight.flight_duration}</TableCell>
                  <TableCell>{flight.airline_name || 'N/A'}</TableCell>
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
              {/* No Flights Found Row */}
              {flights.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No flights found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Snackbar for Alerts */}
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

export default DashboardSearch;
