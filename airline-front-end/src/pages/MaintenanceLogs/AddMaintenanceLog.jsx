// // src/pages/MaintenanceLogs/AddMaintenanceLog.jsx
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { createMaintenanceLog, getAircraft } from '../../services/api';

// function AddMaintenanceLog() {
//   const [form, setForm] = useState({
//     aircraft_id: '',
//     maintenance_date: '',
//     notes: '',
//   });

//   const [aircraftOptions, setAircraftOptions] = useState([]);
//   const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAircraft = async () => {
//       try {
//         const response = await getAircraft();
//         setAircraftOptions(response.data);
//       } catch (error) {
//         console.error('Error fetching aircraft:', error);
//         setAlert({ open: true, message: 'Failed to fetch aircraft options.', severity: 'error' });
//       }
//     };
//     fetchAircraft();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Basic validation
//     if (!form.aircraft_id || !form.maintenance_date) {
//       setAlert({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
//       return;
//     }

//     try {
//       await createMaintenanceLog(form);
//       setAlert({ open: true, message: 'Maintenance log added successfully!', severity: 'success' });
//       setTimeout(() => navigate('/maintenance-logs'), 1500);
//     } catch (error) {
//       console.error('Error adding maintenance log:', error);
//       setAlert({ open: true, message: 'Failed to add maintenance log.', severity: 'error' });
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ ...alert, open: false });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Add New Maintenance Log
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <TextField
//           select
//           label="Aircraft"
//           name="aircraft_id"
//           value={form.aircraft_id}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         >
//           {aircraftOptions.map((aircraft) => (
//             <MenuItem key={aircraft.aircraft_id} value={aircraft.aircraft_id}>
//               {aircraft.model} ({aircraft.airline_name})
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           label="Maintenance Date"
//           name="maintenance_date"
//           type="date"
//           value={form.maintenance_date}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />

//         <TextField
//           label="Notes"
//           name="notes"
//           value={form.notes}
//           onChange={handleChange}
//           fullWidth
//           multiline
//           rows={4}
//           margin="normal"
//         />

//         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//           Add Maintenance Log
//         </Button>
//       </Box>

//       {/* Snackbar for alerts */}
//       <Snackbar
//         open={alert.open}
//         autoHideDuration={6000}
//         onClose={handleCloseAlert}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
//           {alert.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default AddMaintenanceLog;
