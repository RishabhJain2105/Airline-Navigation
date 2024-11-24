// src/components/Footer.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        Airline Management System &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Footer;
