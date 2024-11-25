// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

// Airports
import AirportsList from './pages/Airports/AirportsList';
import AddAirport from './pages/Airports/AddAirport';
import EditAirport from './pages/Airports/EditAirport';

// Routes
import RoutesList from './pages/Routes/RoutesList';
import AddRoute from './pages/Routes/AddRoute';
import EditRoute from './pages/Routes/EditRoute';

// Aircraft
import AircraftList from './pages/Aircraft/AircraftList';
import AddAircraft from './pages/Aircraft/AddAircraft';
import EditAircraft from './pages/Aircraft/EditAircraft';

// Navigation Parameters
// import NavigationParametersList from './pages/AircraftNavigation/NavigationParametersList';
// import AddNavigationParameter from './pages/AircraftNavigation/AddNavigationParameter';
// import EditNavigationParameter from './pages/AircraftNavigation/EditNavigationParameter';

// Aircraft Navigation
import AircraftNavigationList from './pages/AircraftNavigation/AircraftNavigationList';
import AddAircraftNavigation from './pages/AircraftNavigation/AddAircraftNavigation';
import EditAircraftNavigation from './pages/AircraftNavigation/EditAircraftNavigation';

// Flights
import FlightsList from './pages/Flights/FlightsList';
import AddFlight from './pages/Flights/AddFlight';
import EditFlight from './pages/Flights/EditFlight';

// Maintenance Logs
// import MaintenanceLogsList from './pages/MaintenanceLogs/MaintenanceLogsList';
// import AddMaintenanceLog from './pages/MaintenanceLogs/AddMaintenanceLog';
// import EditMaintenanceLog from './pages/MaintenanceLogs/EditMaintenanceLog';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Airports Routes */}
          <Route path="/airports" element={<AirportsList />} />
          <Route path="/airports/add" element={<AddAirport />} />
          <Route path="/airports/edit/:id" element={<EditAirport />} />

          {/* Routes Routes */}
          <Route path="/routes" element={<RoutesList />} />
          <Route path="/routes/add" element={<AddRoute />} />
          <Route path="/routes/edit/:id" element={<EditRoute />} />

          {/* Aircraft Routes */}
          <Route path="/aircraft" element={<AircraftList />} />
          <Route path="/aircraft/add" element={<AddAircraft />} />
          <Route path="/aircraft/edit/:id" element={<EditAircraft />} />

          {/* Navigation Parameters Routes */}
          {/* <Route path="/aircraft-navigation/navigation-parameters" element={<NavigationParametersList />} />
          <Route path="/aircraft-navigation/navigation-parameters/add" element={<AddNavigationParameter />} />
          <Route path="/aircraft-navigation/navigation-parameters/edit/:id" element={<EditNavigationParameter />} /> */}

          {/* Aircraft Navigation Routes */}
          <Route path="/aircraft-navigation" element={<AircraftNavigationList />} />
          <Route path="/aircraft-navigation/add" element={<AddAircraftNavigation />} />
          <Route path="/aircraft-navigation/edit/:id" element={<EditAircraftNavigation />} />

          {/* Flights Routes */}
          <Route path="/flights" element={<FlightsList />} />
          <Route path="/flights/add" element={<AddFlight />} />
          <Route path="/flights/edit/:id" element={<EditFlight />} />

          {/* Maintenance Logs Routes */}
          {/* <Route path="/maintenance-logs" element={<MaintenanceLogsList />} />
          <Route path="/maintenance-logs/add" element={<AddMaintenanceLog />} />
          <Route path="/maintenance-logs/edit/:id" element={<EditMaintenanceLog />} /> */}
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
