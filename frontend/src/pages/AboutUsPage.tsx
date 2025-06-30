import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';
import SecurityIcon from '@mui/icons-material/Security';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

/**
 * About Us Page with company mission and founder profile
 * Professional presentation of VESLINT's story and leadership
 */
const AboutUsPage: React.FC = () => {
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

  const values = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Maritime Security',
      description: 'Enhancing global maritime domain awareness through advanced AI classification systems.',
    },
    {
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />,
      title: 'Precision Engineering',
      description: 'Building robust, accurate AI models that deliver reliable insights for critical maritime operations.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation Leadership',
      description: 'Pioneering the future of maritime surveillance with cutting-edge machine learning technologies.',
    },
    {
      icon: <GroupWorkIcon sx={{ fontSize: 40 }} />,
      title: 'Operational Excellence',
      description: 'Developed by maritime professionals, for maritime professionals who understand real-world challenges.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  color: '#CCD6F6',
                  fontWeight: 600,
                  mb: 3,
                  background: 'linear-gradient(135deg, #CCD6F6 0%, #64FFDA 50%, #CCD6F6 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Pioneering the Future of Maritime Surveillance
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: '#8892B0',
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6,
                }}
              >
                At VESLINT, our mission is to bring clarity and security to the world's oceans. 
                We are dedicated to developing state-of-the-art AI solutions that empower maritime 
                operators with predictive intelligence, enhancing safety, security, and operational 
                efficiency across the globe.
              </Typography>
            </Box>
          </motion.div>

          {/* Mission Statement */}
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                background: 'rgba(17, 34, 64, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: 4,
                mb: 8,
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#64FFDA',
                    fontWeight: 600,
                    mb: 4,
                    textAlign: 'center',
                  }}
                >
                  Our Mission
                </Typography>
                
                <Typography
                  variant="h6"
                  sx={{
                    color: '#CCD6F6',
                    textAlign: 'center',
                    lineHeight: 1.8,
                    maxWidth: '900px',
                    mx: 'auto',
                  }}
                >
                  To revolutionize maritime domain awareness through intelligent vessel classification, 
                  providing maritime professionals with the tools they need to make informed decisions 
                  in an increasingly complex maritime environment. We combine deep maritime expertise 
                  with cutting-edge artificial intelligence to deliver solutions that matter.
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 8 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#CCD6F6',
                  fontWeight: 600,
                  textAlign: 'center',
                  mb: 6,
                }}
              >
                Our Values
              </Typography>
              
              <Grid container spacing={4}>
                {values.map((value, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          background: 'rgba(17, 34, 64, 0.6)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(100, 255, 218, 0.2)',
                          borderRadius: 3,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            border: '1px solid rgba(100, 255, 218, 0.4)',
                            boxShadow: '0 12px 40px rgba(100, 255, 218, 0.1)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box
                            sx={{
                              color: '#64FFDA',
                              mb: 3,
                            }}
                          >
                            {value.icon}
                          </Box>
                          
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#CCD6F6',
                              fontWeight: 600,
                              mb: 2,
                            }}
                          >
                            {value.title}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#8892B0',
                              lineHeight: 1.6,
                            }}
                          >
                            {value.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>

          {/* Founder Section */}
          <motion.div variants={itemVariants}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(17, 34, 64, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                borderRadius: 4,
              }}
            >
              <CardContent sx={{ p: 6 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#CCD6F6',
                    fontWeight: 600,
                    textAlign: 'center',
                    mb: 6,
                  }}
                >
                  Leadership
                </Typography>
                
                <Grid container spacing={6} alignItems="center">
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          width: 180,
                          height: 180,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '3px solid rgba(100, 255, 218, 0.3)',
                          boxShadow: '0 8px 32px rgba(100, 255, 218, 0.2)',
                          mx: 'auto',
                          mb: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <img
                          src="/assets/ceo.png"
                          alt="Oussama BEN SALEM"
                          style={{
                            width: '110%',
                            height: '110%',
                            objectFit: 'contain',
                          }}
                        />
                      </Box>
                    </motion.div>

                    </motion.div>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                      <Chip
                        label="Navy Officer"
                        sx={{
                          backgroundColor: 'rgba(100, 255, 218, 0.1)',
                          color: '#64FFDA',
                          border: '1px solid rgba(100, 255, 218, 0.3)',
                        }}
                      />
                      <Chip
                        label="Data Scientist"
                        sx={{
                          backgroundColor: 'rgba(100, 255, 218, 0.1)',
                          color: '#64FFDA',
                          border: '1px solid rgba(100, 255, 218, 0.3)',
                        }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#64FFDA',
                        fontWeight: 600,
                        mb: 1,
                      }}
                    >
                      Oussama BEN SALEM
                    </Typography>
                    
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#8892B0',
                        mb: 4,
                        fontWeight: 500,
                      }}
                    >
                      Founder & CEO – VESLINT
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: '#CCD6F6',
                        lineHeight: 1.8,
                        fontSize: '1.1rem',
                      }}
                    >
                      Navy officer and data scientist with 10+ years of operational, strategic, and technical experience.
                      Director of International Cooperation at Tunisian Navy HQ. Leader in AI-powered maritime security solutions.
                      <br /><br />
                      <strong style={{ color: '#64FFDA' }}>Proven record in</strong>
                      <br />
                      • Developing and executing defense cooperation strategies
                      <br />
                      • Designing AI systems for real-time maritime anomaly detection
                      <br />
                      • Managing complex naval operations and joint exercises
                      <br />
                      • Enhancing operational efficiency through data science
                      <br /><br />
                      VESLINT reflects this dual expertise. A platform built by an operator for operators.
                      Focused on mission success, security, and innovation.
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutUsPage;