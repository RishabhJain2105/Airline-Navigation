// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; // JSON Server runs on port 8000 by default
// Airports
export const getAirports = () => axios.get(`${API_BASE_URL}/airports`);
export const getAirportById = (id) => axios.get(`${API_BASE_URL}/airports/${id}`);
export const createAirport = (data) => axios.post(`${API_BASE_URL}/airports`, data);
export const updateAirport = (id, data) => axios.put(`${API_BASE_URL}/airports/${id}`, data);
export const deleteAirport = (id) => axios.delete(`${API_BASE_URL}/airports/${id}`);

// Routes
export const getRoutes = () => axios.get(`${API_BASE_URL}/routes`);
export const getRouteById = (id) => axios.get(`${API_BASE_URL}/routes/${id}`);
export const createRoute = (data) => axios.post(`${API_BASE_URL}/routes`, data);
export const updateRoute = (id, data) => axios.put(`${API_BASE_URL}/routes/${id}`, data);
export const deleteRoute = (id) => axios.delete(`${API_BASE_URL}/routes/${id}`);

// Aircraft
export const getAircraft = () => axios.get(`${API_BASE_URL}/aircraft`);
export const getAircraftById = (id) => axios.get(`${API_BASE_URL}/aircraft/${id}`);
export const createAircraft = (data) => axios.post(`${API_BASE_URL}/aircraft`, data);
export const updateAircraft = (id, data) => axios.put(`${API_BASE_URL}/aircraft/${id}`, data);
export const deleteAircraft = (id) => axios.delete(`${API_BASE_URL}/aircraft/${id}`);

// Navigation Parameters
export const getNavigationParameters = () => axios.get(`${API_BASE_URL}/navigation_parameters`);
export const getNavigationParameterById = (id) => axios.get(`${API_BASE_URL}/navigation_parameters/${id}`);
export const createNavigationParameter = (data) => axios.post(`${API_BASE_URL}/navigation_parameters`, data);
export const updateNavigationParameter = (id, data) => axios.put(`${API_BASE_URL}/navigation_parameters/${id}`, data);
export const deleteNavigationParameter = (id) => axios.delete(`${API_BASE_URL}/navigation_parameters/${id}`);

// Aircraft Navigation
export const getAircraftNavigation = () => axios.get(`${API_BASE_URL}/aircraft_navigation`);
export const getAircraftNavigationById = (id) => axios.get(`${API_BASE_URL}/aircraft_navigation/${id}`);
export const createAircraftNavigation = (data) => axios.post(`${API_BASE_URL}/aircraft_navigation`, data);
export const updateAircraftNavigation = (id, data) => axios.put(`${API_BASE_URL}/aircraft_navigation/${id}`, data);
export const deleteAircraftNavigation = (id) => axios.delete(`${API_BASE_URL}/aircraft_navigation/${id}`);

// Flights
export const getFlights = () => axios.get(`${API_BASE_URL}/flights`);
export const getFlightById = (id) => axios.get(`${API_BASE_URL}/flights/${id}`);
export const createFlight = (data) => axios.post(`${API_BASE_URL}/flights`, data);
export const updateFlight = (id, data) => axios.put(`${API_BASE_URL}/flights/${id}`, data);
export const deleteFlight = (id) => axios.delete(`${API_BASE_URL}/flights/${id}`);

// Maintenance Logs
export const getMaintenanceLogs = () => axios.get(`${API_BASE_URL}/maintenance_logs`);
export const getMaintenanceLogById = (id) => axios.get(`${API_BASE_URL}/maintenance_logs/${id}`);
export const createMaintenanceLog = (data) => axios.post(`${API_BASE_URL}/maintenance_logs`, data);
export const updateMaintenanceLog = (id, data) => axios.put(`${API_BASE_URL}/maintenance_logs/${id}`, data);
export const deleteMaintenanceLog = (id) => axios.delete(`${API_BASE_URL}/maintenance_logs/${id}`);
