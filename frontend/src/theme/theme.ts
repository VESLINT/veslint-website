import { createTheme } from '@mui/material/styles';

/**
 * Crystal Intelligence Theme - A sophisticated dark theme for VESLINT
 * Combines naval command center aesthetics with cutting-edge data science platform design
 */
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64FFDA', // Electric Cyan
      dark: '#4FD1C7',
      light: '#7FFFD4',
      contrastText: '#0A192F',
    },
    secondary: {
      main: '#8892B0', // Light Slate
      dark: '#6B7688',
      light: '#A5B3D8',
      contrastText: '#CCD6F6',
    },
    background: {
      default: '#0A192F', // Deep Navy Blue
      paper: '#112240', // Dark Charcoal
    },
    text: {
      primary: '#CCD6F6', // Soft White
      secondary: '#8892B0', // Light Slate
    },
    error: {
      main: '#FF6B6B',
      dark: '#E55A5A',
      light: '#FF8E8E',
    },
    warning: {
      main: '#FFC107', // Amber/Gold
      dark: '#E6AC00',
      light: '#FFD54F',
    },
    success: {
      main: '#64FFDA',
      dark: '#4FD1C7',
      light: '#7FFFD4',
    },
    info: {
      main: '#64B5F6',
      dark: '#42A5F5',
      light: '#90CAF9',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(100, 255, 218, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #64FFDA 0%, #4FD1C7 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
          },
        },
        outlined: {
          borderColor: '#64FFDA',
          color: '#64FFDA',
          '&:hover': {
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            borderColor: '#7FFFD4',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(17, 34, 64, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(100, 255, 218, 0.1)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 25, 47, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(17, 34, 64, 0.5)',
            '& fieldset': {
              borderColor: 'rgba(100, 255, 218, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(100, 255, 218, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#64FFDA',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;