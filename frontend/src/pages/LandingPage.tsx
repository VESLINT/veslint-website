import React from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BarChartIcon from '@mui/icons-material/BarChart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

/**
 * Enhanced Landing Page with Crystal Intelligence design
 * Marketing-focused page with hero section, features, and compelling CTAs
 */
const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <CloudUploadIcon sx={{ fontSize: 60 }} />,
      title: 'Classified Data Protection',
      description: 'Military-grade encryption and secure data handling protocols ensure complete operational security for your sensitive AIS intelligence.',
    },
    {
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 60 }} />,
      title: 'Advanced Threat Detection',
      description: 'Cutting-edge AI algorithms identify suspicious vessel patterns, dark ships, and potential security threats with military precision.',
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 60 }} />,
      title: 'Mission-Critical Analytics',
      description: 'Real-time operational intelligence with tactical dashboards designed for command centers and defense decision-makers.',
    },
    {
      icon: <VisibilityIcon sx={{ fontSize: 60 }} />,
      title: 'Strategic Maritime Awareness',
      description: 'Complete situational awareness with integrated threat assessment tools and multi-layered intelligence visualization.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 60 }} />,
      title: 'Rapid Response Intelligence',
      description: 'Instant threat analysis and alert systems enabling swift tactical responses to emerging maritime security challenges.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 60 }} />,
      title: 'National Security Integration',
      description: 'Seamlessly integrates with existing defense infrastructure to enhance maritime domain awareness and border security.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      },
    },
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0B1426 0%, #1A2B4D 30%, #2C4F7C 70%, #1E3A5F 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 8, md: 16 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(0, 150, 255, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(100, 255, 218, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
            `,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              {/* Logo Section */}
              <motion.div variants={logoVariants}>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      p: 3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(0, 150, 255, 0.1) 100%)',
                      border: '2px solid rgba(100, 255, 218, 0.3)',
                      boxShadow: '0 0 40px rgba(100, 255, 218, 0.2)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, #64FFDA, #0096FF, #64FFDA)',
                        zIndex: -1,
                        animation: 'pulse 3s ease-in-out infinite',
                      },
                      '@keyframes pulse': {
                        '0%, 100%': { opacity: 0.3 },
                        '50%': { opacity: 0.6 },
                      },
                    }}
                  >
                    <img
                      src="/assets/logo.png"
                      alt="VESLINT Logo"
                      style={{
                        width: isMobile ? '100px' : '150px',
                        height: isMobile ? '100px' : '150px',
                        objectFit: 'contain',
                        filter: 'brightness(1.1) contrast(1.1)',
                      }}
                    />
                  </Box>
                </Box>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? 'h3' : 'h1'}
                  component="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 2,
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #64FFDA 30%, #0096FF 70%, #FFFFFF 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 4px 20px rgba(100, 255, 218, 0.3)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  DEFEND THE HORIZON.
                  <br />
                  COMMAND THE SEAS.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#64FFDA',
                    mb: 1,
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}
                >
                  VESLINT
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#8BB8E8',
                    mb: 4,
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    opacity: 0.9,
                  }}
                >
                  VEssel Surveillance & Logging INTelligence
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    color: '#B8C5D6',
                    mb: 2,
                    maxWidth: '900px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  The Ultimate Maritime Intelligence Platform for Defense Operations
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#8BB8E8',
                    mb: 6,
                    maxWidth: '800px',
                    mx: 'auto',
                    lineHeight: 1.7,
                    fontSize: '1.1rem',
                  }}
                >
                  Harness the power of military-grade AI to transform AIS data into actionable intelligence. 
                  Identify threats, classify vessels, and maintain maritime superiority with unprecedented precision.
                  <br />
                </Typography>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    px: 8,
                    py: 2.5,
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: 'linear-gradient(135deg, #64FFDA 0%, #0096FF 100%)',
                    boxShadow: '0 12px 40px rgba(100, 255, 218, 0.4)',
                    border: '2px solid transparent',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0096FF 0%, #0066CC 100%)',
                      boxShadow: '0 16px 50px rgba(0, 150, 255, 0.5)',
                      border: '2px solid rgba(100, 255, 218, 0.5)',
                    },
                  }}
                >
                  Deploy VESLINT
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div variants={itemVariants}>
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
                  <Typography variant="caption" sx={{ color: '#64FFDA', fontWeight: 600, opacity: 0.8 }}>
                    🛰️ DEFENSE-GRADE AI
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64FFDA', fontWeight: 600, opacity: 0.8 }}>
                    🔒 CLASSIFIED READY
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64FFDA', fontWeight: 600, opacity: 0.8 }}>
                    ⚡ REAL-TIME INTEL
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h2"
                sx={{
                  color: '#CCD6F6',
                  fontWeight: 700,
                  mb: 3,
                  letterSpacing: '-0.01em',
                }}
              >
                Mission-Critical Maritime Intelligence
              </Typography>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Typography
                variant="h6"
                sx={{
                  color: '#8BB8E8',
                  maxWidth: '700px',
                  mx: 'auto',
                  fontWeight: 500,
                }}
              >
                Advanced AI-powered surveillance designed for defense professionals who demand operational excellence
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(17, 34, 64, 0.8) 0%, rgba(26, 43, 77, 0.6) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      borderRadius: 4,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #64FFDA, #0096FF)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover': {
                        border: '1px solid rgba(100, 255, 218, 0.5)',
                        boxShadow: '0 20px 60px rgba(100, 255, 218, 0.15)',
                        '&::before': {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          color: '#64FFDA',
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'center',
                          filter: 'drop-shadow(0 4px 8px rgba(100, 255, 218, 0.3))',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#CCD6F6',
                          fontWeight: 700,
                          mb: 2,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#8BB8E8',
                          lineHeight: 1.7,
                          fontSize: '0.95rem',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0B1426 0%, #1A2B4D 50%, #0B1426 100%)',
          py: { xs: 8, md: 12 },
          borderTop: '2px solid rgba(100, 255, 218, 0.2)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Cpath d="m0 40l40-40h-40z"/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant={isMobile ? 'h4' : 'h3'}
                  sx={{
                    color: '#CCD6F6',
                    fontWeight: 700,
                    mb: 3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Ready to Secure Your Maritime Domain?
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#8BB8E8',
                    mb: 6,
                    lineHeight: 1.6,
                    fontWeight: 500,
                  }}
                >
                  Designed for modern navies and defense teams seeking trusted maritime intelligence solutions.
                </Typography>
              </motion.div>

              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.div 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/register"
                    sx={{
                      px: 6,
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      background: 'linear-gradient(135deg, #64FFDA 0%, #0096FF 100%)',
                      boxShadow: '0 12px 40px rgba(100, 255, 218, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0096FF 0%, #0066CC 100%)',
                        boxShadow: '0 16px 50px rgba(0, 150, 255, 0.4)',
                      },
                    }}
                  >
                    Request Access
                  </Button>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    to="/research#capabilities"
                    sx={{
                      px: 6,
                      py: 2.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      borderColor: 'rgba(100, 255, 218, 0.5)',
                      color: '#64FFDA',
                      '&:hover': {
                        borderColor: '#64FFDA',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        boxShadow: '0 8px 25px rgba(100, 255, 218, 0.2)',
                      },
                    }}
                  >
                    View Capabilities
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;