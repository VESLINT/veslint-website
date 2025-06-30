import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../firebase-config';

/**
 * Crystal Intelligence Navigation Bar
 * Responsive, glassmorphic navbar with smooth animations and professional styling
 */
const Navbar: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleUserMenuClose();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'R&D', path: '/research' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const authenticatedItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'New Analysis', path: '/new-analysis', icon: <AddCircleIcon /> },
  ];

  const renderDesktopNav = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {!user ? (
        <>
          {navigationItems.map((item) => (
            <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  color: '#8892B0',
                  '&:hover': {
                    color: '#64FFDA',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/login"
              sx={{ ml: 2 }}
            >
              Login
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </motion.div>
        </>
      ) : (
        <>
          {authenticatedItems.map((item) => (
            <motion.div key={item.path} whileHover={{ scale: 1.05 }}>
              <Button
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: '#8892B0',
                  '&:hover': {
                    color: '#64FFDA',
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            </motion.div>
          ))}
          <IconButton
            onClick={handleUserMenuOpen}
            sx={{
              ml: 2,
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.1)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: '#64FFDA',
                color: '#0A192F',
                fontSize: '0.875rem',
                fontWeight: 600,
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
          </IconButton>
        </>
      )}
    </Box>
  );

  const renderMobileDrawer = () => (
    <Drawer
      anchor="right"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          background: 'rgba(10, 25, 47, 0.95)',
          backdropFilter: 'blur(20px)',
          width: 280,
          border: 'none',
          borderLeft: '1px solid rgba(100, 255, 218, 0.1)',
        },
      }}
    >
      <List sx={{ pt: 4 }}>
        {!user ? (
          <>
            {navigationItems.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileDrawerOpen(false)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{ color: '#CCD6F6' }}
                />
              </ListItem>
            ))}
            <ListItem
              component={Link}
              to="/login"
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                mt: 2,
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                },
              }}
            >
              <ListItemText
                primary="Login"
                sx={{ color: '#64FFDA' }}
              />
            </ListItem>
            <ListItem
              component={Link}
              to="/register"
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                },
              }}
            >
              <ListItemText
                primary="Register"
                sx={{ color: '#64FFDA' }}
              />
            </ListItem>
          </>
        ) : (
          <>
            {authenticatedItems.map((item) => (
              <ListItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setMobileDrawerOpen(false)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {item.icon}
                  <ListItemText
                    primary={item.label}
                    sx={{ color: '#CCD6F6' }}
                  />
                </Box>
              </ListItem>
            ))}
            <ListItem
              onClick={() => {
                handleLogout();
                setMobileDrawerOpen(false);
              }}
              sx={{
                mt: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LogoutIcon />
                <ListItemText
                  primary="Logout"
                  sx={{ color: '#FF6B6B' }}
                />
              </Box>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ flexGrow: 1 }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.5,
              }}
            >
              <Box
                component="img"
                src="/assets/logo.png"
                alt="VESLINT Logo"
                sx={{
                  height: 40,
                  width: 'auto',
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#64FFDA',
                    background: 'linear-gradient(135deg, #64FFDA 0%, #7FFFD4 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.1em',
                    lineHeight: 1.2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  VESLINT
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#8892B0',
                    fontSize: '0.7rem',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    mt: -0.5,
                    textTransform: 'uppercase',
                    opacity: 0.9,
                  }}
                >
                  VEssel Surveillance & Logging INTelligence
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {!loading && (
            <>
              {isMobile ? (
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setMobileDrawerOpen(true)}
                  sx={{
                    color: '#64FFDA',
                    '&:hover': {
                      backgroundColor: 'rgba(100, 255, 218, 0.1)',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              ) : (
                renderDesktopNav()
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(17, 34, 64, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: 2,
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={handleUserMenuClose}
          sx={{
            color: '#CCD6F6',
            '&:hover': {
              backgroundColor: 'rgba(100, 255, 218, 0.1)',
            },
          }}
        >
          <AccountCircleIcon sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: '#FF6B6B',
            '&:hover': {
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      {renderMobileDrawer()}
    </>
  );
};

export default Navbar;