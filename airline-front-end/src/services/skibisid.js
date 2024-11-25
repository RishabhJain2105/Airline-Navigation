// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI server

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

export const getNavigationParameters = () => axios.get(`${API_BASE_URL}/navigation_parameters`);
export const getNavigationParameterById = (id) => axios.get(`${API_BASE_URL}/navigation_parameters/${id}`);
export const createNavigationParameter = (data) => axios.post(`${API_BASE_URL}/navigation_parameters`, data);
export const updateNavigationParameter = (id, data) => axios.put(`${API_BASE_URL}/navigation_parameters/${id}`, data);
export const deleteNavigationParameter = (id) => axios.delete(`${API_BASE_URL}/navigation_parameters/${id}`);


/** 
 * ***Added Search Functions Below***
 */

// Search Flights by Airline (Assuming 'airline' is a field in flights)
export const searchFlightsByAirline = (airline) => {
  return axios.get(`${API_BASE_URL}/flights`, {
    params: {
      airline_like: airline, // Partial match
    },
  });
};

// Search Aircraft by Model
export const searchAircraftByModel = (model) => {
  return axios.get(`${API_BASE_URL}/aircraft`, {
    params: {
      model_like: model, // Partial match
    },
  });
};

// Search Routes by Route ID or Departure/Arrival Airport
export const searchRoutes = (routeId, departureAirport, arrivalAirport) => {
  let params = {};
  if (routeId) params.route_id_like = routeId;
  if (departureAirport) params.departure_airport_like = departureAirport;
  if (arrivalAirport) params.arrival_airport_like = arrivalAirport;
  return axios.get(`${API_BASE_URL}/routes`, { params });
};

// Search Airports by Airport Name or Country
export const searchAirports = (airportName, country) => {
  let params = {};
  if (airportName) params.airport_name_like = airportName;
  if (country) params.country_like = country;
  return axios.get(`${API_BASE_URL}/airports`, { params });
};
