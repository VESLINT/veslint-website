import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GoogleIcon from '@mui/icons-material/Google';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

/**
 * Enhanced Registration Page with Crystal Intelligence design
 * Professional account creation with validation and error handling
 */
const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    setError('');
    
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #1A2B4D 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 70% 20%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              background: 'rgba(17, 34, 64, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              borderRadius: 4,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #64FFDA 0%, #4FD1C7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                    }}
                  >
                    <PersonAddIcon sx={{ fontSize: 40, color: '#0A192F' }} />
                  </Box>
                </motion.div>

                <Typography
                  variant="h4"
                  sx={{
                    color: '#CCD6F6',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  Join VESLINT
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#8892B0',
                  }}
                >
                  Create your account to get started
                </Typography>
              </Box>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mb: 3,
                      backgroundColor: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      '& .MuiAlert-message': {
                        color: '#FF6B6B',
                      },
                    }}
                  >
                    {error}
                  </Alert>
                </motion.div>
              )}

              <Box component="form" onSubmit={handleRegister} sx={{ mb: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 3 }}
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: '#0A192F' }} />
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </motion.div>
              </Box>

              <Divider sx={{ my: 3, borderColor: 'rgba(100, 255, 218, 0.2)' }}>
                <Typography variant="body2" sx={{ color: '#8892B0', px: 2 }}>
                  or
                </Typography>
              </Divider>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleSignUp}
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 500,
                    mb: 3,
                  }}
                >
                  Continue with Google
                </Button>
              </motion.div>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#8892B0' }}>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{
                      color: '#64FFDA',
                      textDecoration: 'none',
                      fontWeight: 500,
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterPage;