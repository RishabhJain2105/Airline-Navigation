// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import DashboardSearch from '../components/DashboardSearch';

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Welcome to the Airline Management System
      </Typography>
      
      {/* Search Interface */}
      <DashboardSearch />
    </Container>
  );
}

export default Dashboard;
