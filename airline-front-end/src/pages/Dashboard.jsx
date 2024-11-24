// src/pages/Dashboard.jsx
import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import { AirportShuttle, Flight, Build, History } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const dashboardItems = [
  { title: 'Airports', icon: <AirportShuttle fontSize="large" />, path: '/airports' },
  { title: 'Routes', icon: <Flight fontSize="large" />, path: '/routes' },
  { title: 'Aircraft', icon: <Build fontSize="large" />, path: '/aircraft' },
  { title: 'Maintenance Logs', icon: <History fontSize="large" />, path: '/maintenance-logs' },
  // Add more items as needed
];

function Dashboard() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Paper
              component={Link}
              to={item.path}
              sx={{
                padding: 2,
                textAlign: 'center',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <Box display="flex" flexDirection="column" alignItems="center">
                {item.icon}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {item.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Dashboard;
