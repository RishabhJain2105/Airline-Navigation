// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { text: 'Dashboard', path: '/' },
  { text: 'Airports', path: '/airports' },
  { text: 'Routes', path: '/routes' },
  { text: 'Aircraft', path: '/aircraft' },
  { text: 'Navigation Parameters', path: '/navigation-parameters' },
  { text: 'Aircraft Navigation', path: '/aircraft-navigation' },
  { text: 'Flights', path: '/flights' },
  { text: 'Maintenance Logs', path: '/maintenance-logs' },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Airline Management
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Airline Management
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.text} component={Link} to={item.path} sx={{ color: '#fff' }}>
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Offset for content to avoid being hidden under AppBar */}
      <Toolbar />
    </>
  );
}

export default Navbar;
