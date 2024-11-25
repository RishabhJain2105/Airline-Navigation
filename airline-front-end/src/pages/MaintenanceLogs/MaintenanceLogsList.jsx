// // src/pages/MaintenanceLogs/MaintenanceLogsList.jsx
// import React, { useEffect, useState } from 'react';
// import {
//   Container,
//   Typography,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   IconButton,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { Edit, Delete } from '@mui/icons-material';
// import { getMaintenanceLogs, deleteMaintenanceLog, getAircraft } from '../../services/api';

// function MaintenanceLogsList() {
//   const [maintenanceLogs, setMaintenanceLogs] = useState([]);
//   const [aircraftOptions, setAircraftOptions] = useState({});
//   const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

//   const fetchMaintenanceLogs = async () => {
//     try {
//       const [logsRes, aircraftRes] = await Promise.all([getMaintenanceLogs(), getAircraft()]);
//       setMaintenanceLogs(logsRes.data);
//       // Create a mapping from aircraft_id to aircraft name for display
//       const aircraftMap = {};
//       aircraftRes.data.forEach((aircraft) => {
//         aircraftMap[aircraft.aircraft_id] = `${aircraft.model} (${aircraft.airline_name})`;
//       });
//       setAircraftOptions(aircraftMap);
//     } catch (error) {
//       console.error('Error fetching maintenance logs:', error);
//       setAlert({ open: true, message: 'Failed to fetch maintenance logs.', severity: 'error' });
//     }
//   };

//   useEffect(() => {
//     fetchMaintenanceLogs();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this maintenance log?')) {
//       try {
//         await deleteMaintenanceLog(id);
//         setMaintenanceLogs(maintenanceLogs.filter((log) => log.log_id !== id));
//         setAlert({ open: true, message: 'Maintenance log deleted successfully.', severity: 'success' });
//       } catch (error) {
//         console.error('Error deleting maintenance log:', error);
//         setAlert({ open: true, message: 'Failed to delete maintenance log.', severity: 'error' });
//       }
//     }
//   };

//   const handleCloseAlert = () => {
//     setAlert({ ...alert, open: false });
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Maintenance Logs
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         component={Link}
//         to="/maintenance-logs/add"
//         sx={{ marginBottom: 2 }}
//       >
//         Add Maintenance Log
//       </Button>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Log ID</TableCell>
//               <TableCell>Aircraft</TableCell>
//               <TableCell>Maintenance Date</TableCell>
//               <TableCell>Notes</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {maintenanceLogs.map((log) => (
//               <TableRow key={log.log_id}>
//                 <TableCell>{log.log_id}</TableCell>
//                 <TableCell>{aircraftOptions[log.aircraft_id]}</TableCell>
//                 <TableCell>{new Date(log.maintenance_date).toLocaleDateString()}</TableCell>
//                 <TableCell>{log.notes}</TableCell>
//                 <TableCell align="center">
//                   <IconButton
//                     component={Link}
//                     to={`/maintenance-logs/edit/${log.log_id}`}
//                     color="primary"
//                   >
//                     <Edit />
//                   </IconButton>
//                   <IconButton
//                     onClick={() => handleDelete(log.log_id)}
//                     color="error"
//                   >
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {maintenanceLogs.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">
//                   No maintenance logs found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

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

// export default MaintenanceLogsList;
