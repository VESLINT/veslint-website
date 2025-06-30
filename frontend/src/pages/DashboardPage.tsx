import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAuth } from '../hooks/useAuth';
import JobsList from '../features/dashboard/JobsList';

/**
 * Enhanced Dashboard with Crystal Intelligence design
 * User's main command center with analytics and quick actions
 */
const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: '#64FFDA',
                    color: '#0A192F',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    mr: 3,
                  }}
                >
                  {getUserDisplayName().charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#CCD6F6',
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    Welcome back, {getUserDisplayName()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#8892B0',
                    }}
                  >
                    Ready to analyze maritime data with AI-powered intelligence
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div variants={itemVariants}>
            <Grid container spacing={3} sx={{ mb: 6 }}>
              <Grid item xs={12} md={8}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(17, 34, 64, 0.8) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(100, 255, 218, 0.3)',
                    borderRadius: 3,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '200px',
                      height: '200px',
                      background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, transparent 70%)',
                      borderRadius: '50%',
                      transform: 'translate(50%, -50%)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <AnalyticsIcon sx={{ fontSize: 40, color: '#64FFDA', mr: 2 }} />
                      <Typography
                        variant="h5"
                        sx={{
                          color: '#CCD6F6',
                          fontWeight: 600,
                        }}
                      >
                        Start New Analysis
                      </Typography>
                    </Box>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#8892B0',
                        mb: 4,
                        lineHeight: 1.6,
                      }}
                    >
                      Upload your AIS data and let our advanced machine learning models 
                      classify vessels with unprecedented accuracy. Get detailed insights 
                      and performance metrics in minutes.
                    </Typography>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to="/new-analysis"
                        startIcon={<AddIcon />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 600,
                        }}
                      >
                        Upload Data
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    background: 'rgba(17, 34, 64, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                    '&:hover': {
                      border: '1px solid rgba(100, 255, 218, 0.4)',
                      boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 48, color: '#64FFDA', mb: 2 }} />
                    
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#CCD6F6',
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      AI-Powered Classification
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#8892B0',
                        lineHeight: 1.6,
                      }}
                    >
                      Our models achieve 95%+ accuracy in vessel type classification, 
                      providing reliable insights for maritime operations.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </motion.div>

          {/* Analysis History Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: '#CCD6F6',
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Analysis History
              </Typography>
              
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: 3,
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <JobsList />
                </CardContent>
              </Card>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default DashboardPage;