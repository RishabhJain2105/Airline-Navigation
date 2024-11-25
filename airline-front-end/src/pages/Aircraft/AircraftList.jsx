// src/pages/Aircraft/AircraftList.jsx
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Snackbar,
  Alert,
  Button,
  CircularProgress,
} from '@mui/material';
import { getAircraft, deleteAircraft } from '../../services/api'; // Using absolute import

function AircraftList() {
  const [aircraft, setAircraft] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const response = await getAircraft();
        setAircraft(response.data);
      } catch (error) {
        console.error('Error fetching aircraft:', error);
        setAlert({ open: true, message: 'Failed to fetch aircraft.', severity: 'error' });
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchAircraft();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this aircraft?')) return;

    try {
      await deleteAircraft(id);
      setAircraft(aircraft.filter((ac) => ac.aircraft_id !== id));
      setAlert({ open: true, message: 'Aircraft deleted successfully.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting aircraft:', error);
      setAlert({ open: true, message: 'Failed to delete aircraft.', severity: 'error' });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Aircraft List
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Aircraft List
      </Typography>
      {aircraft.length === 0 ? (
        <Typography>No aircraft found.</Typography>
      ) : (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Aircraft ID</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Capacity</TableCell>
                <TableCell>Range (km)</TableCell>
                <TableCell>Airline Name</TableCell>
                <TableCell>Actions</TableCell>
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
                  <TableCell>
                    {/* Placeholder for Edit functionality */}
                    {/* <Button color="primary">Edit</Button> */}
                    <Button color="secondary" onClick={() => handleDelete(ac.aircraft_id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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

export default AircraftList;
