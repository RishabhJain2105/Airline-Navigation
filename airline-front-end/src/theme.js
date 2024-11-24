// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e', // Customize as needed
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    // Customize other typography variants as needed
  },
  // Add more customization if needed
});

export default theme;
