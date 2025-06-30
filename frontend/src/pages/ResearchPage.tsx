import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  TrendingUp,
  Security,
  Speed,
  CloudQueue,
  Psychology,
  Satellite,
  AccountBalance,
  Engineering,
  Analytics,
  AutoFixHigh,
  RocketLaunch,
  Shield,
} from '@mui/icons-material';

/**
 * Research & Development Page
 * Showcases VESLINT's technological capabilities, market analysis, and innovation
 */
const ResearchPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const ref = useRef<Element>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true });
  const location = useLocation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Handle scroll to section on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  }, [location]);

  // Market statistics for impressive data visualization
  const marketStats = [
    {
      title: 'Market Growth',
      value: '40.6%',
      subtitle: 'Annual Growth Rate',
      description: 'Maritime AI surveillance market',
      icon: <TrendingUp />,
      color: '#64FFDA',
    },
    {
      title: 'Market Size 2030',
      value: '$32.7B',
      subtitle: 'Addressable Market',
      description: 'Total addressable market by 2030',
      icon: <AccountBalance />,
      color: '#4FD1C7',
    },
    {
      title: 'AI Accuracy',
      value: '98.92%',
      subtitle: 'Vessel Recognition',
      description: 'Advanced MTF + VGG-16 networks',
      icon: <Psychology />,
      color: '#FFC107',
    },
    {
      title: 'Response Time',
      value: '<2s',
      subtitle: 'Real-time Processing',
      description: 'Sub-second safety triggers',
      icon: <Speed />,
      color: '#FF6B6B',
    },
  ];

  const technologies = [
    {
      title: 'Transformer-LSTM Fusion',
      description: 'Self-attention mechanisms with temporal sequence modeling for superior trajectory prediction',
      capabilities: ['Superior trajectory prediction', 'Behavioral pattern recognition', 'Real-time AIS processing'],
      progress: 95,
    },
    {
      title: 'Ensemble Learning Framework',
      description: 'Multi-sensor data fusion with environmental knowledge integration',
      capabilities: ['10³ reduction in data volume', 'No accuracy sacrifice', 'Multi-sensor fusion'],
      progress: 92,
    },
    {
      title: 'Edge Computing Implementation',
      description: 'Sub-second response for automated safety triggers and collision avoidance',
      capabilities: ['Autonomous vessel operations', 'Collision avoidance', 'Local processing'],
      progress: 88,
    },
    {
      title: 'Quantum-Ready Infrastructure',
      description: 'Future-proof architecture for quantum computing integration',
      capabilities: ['Complex route optimization', 'Enhanced security', 'Advanced pattern recognition'],
      progress: 75,
    },
  ];

  const TabPanel = ({ children, value, index }: any) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 4 }}>{children}</Box>}
    </div>
  );

  const StatCard = ({ stat, index }: { stat: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Card
        sx={{
          background: `linear-gradient(135deg, ${stat.color}15 0%, rgba(17, 34, 64, 0.8) 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${stat.color}40`,
          borderRadius: 3,
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 20px 40px ${stat.color}20`,
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box
            sx={{
              color: stat.color,
              mb: 3,
              fontSize: 48,
            }}
          >
            {stat.icon}
          </Box>
          
          <Typography
            variant="h2"
            sx={{
              color: stat.color,
              fontWeight: 700,
              mb: 1,
              fontSize: '3rem',
            }}
          >
            {stat.value}
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#CCD6F6',
              fontWeight: 600,
              mb: 1,
            }}
          >
            {stat.subtitle}
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#8892B0',
            }}
          >
            {stat.description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                color: '#CCD6F6',
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #CCD6F6 0%, #64FFDA 50%, #4FD1C7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '4rem' },
              }}
            >
              Research & Development
            </Typography>
            
            <Typography
              variant="h4"
              sx={{
                color: '#64FFDA',
                fontWeight: 600,
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Next-Generation Maritime Intelligence Platform
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#8892B0',
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              The maritime AI surveillance sector stands at a critical inflection point. VESLINT emerges as a 
              transformative solution positioned to capture significant value in the rapidly expanding maritime 
              intelligence market through revolutionary AI foundations and breakthrough technologies.
            </Typography>
          </Box>
        </motion.div>

        {/* Market Statistics */}
        <Box ref={ref} sx={{ mb: 10 }}>
          <Typography
            variant="h3"
            sx={{
              color: '#CCD6F6',
              fontWeight: 600,
              textAlign: 'center',
              mb: 6,
            }}
          >
            Market Leadership Metrics
          </Typography>
          
          <Grid container spacing={4}>
            {marketStats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StatCard stat={stat} index={index} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tabbed Content */}
        <Card
          sx={{
            background: 'rgba(17, 34, 64, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: 4,
            mb: 8,
          }}
        >
          <Box sx={{ borderBottom: '1px solid rgba(100, 255, 218, 0.2)' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              sx={{
                '& .MuiTab-root': {
                  color: '#8892B0',
                  fontWeight: 500,
                  px: 4,
                  '&.Mui-selected': {
                    color: '#64FFDA',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#64FFDA',
                  height: 3,
                },
              }}
            >
              <Tab label="AI Technologies" />
              <Tab label="Cloud Architecture" />
              <Tab label="Market Analysis" />
              <Tab label="Future Technologies" />
            </Tabs>
          </Box>

          {/* AI Technologies Tab */}
          <TabPanel value={currentTab} index={0}>
            <Box sx={{ p: 6 }} id="capabilities">
              <Typography
                variant="h4"
                sx={{
                  color: '#64FFDA',
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Revolutionary AI Foundations
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#CCD6F6',
                  mb: 6,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Modern maritime surveillance demands sophisticated AI architectures that can process millions of AIS 
                messages daily while maintaining sub-second response times for critical safety applications. VESLINT 
                leverages breakthrough technologies that represent a quantum leap beyond traditional surveillance capabilities.
              </Typography>

              <Grid container spacing={4}>
                {technologies.map((tech, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card
                        sx={{
                          background: 'rgba(10, 25, 47, 0.8)',
                          border: '1px solid rgba(100, 255, 218, 0.2)',
                          borderRadius: 3,
                          height: '100%',
                          '&:hover': {
                            border: '1px solid rgba(100, 255, 218, 0.4)',
                            boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#64FFDA',
                              fontWeight: 600,
                              mb: 2,
                            }}
                          >
                            {tech.title}
                          </Typography>
                          
                          <Typography
                            variant="body1"
                            sx={{
                              color: '#CCD6F6',
                              mb: 3,
                              lineHeight: 1.6,
                            }}
                          >
                            {tech.description}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ color: '#8892B0' }}>
                                Development Progress
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#64FFDA' }}>
                                {tech.progress}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={tech.progress}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#64FFDA',
                                  borderRadius: 4,
                                },
                              }}
                            />
                          </Box>

                          <List dense>
                            {tech.capabilities.map((capability, capIndex) => (
                              <ListItem key={capIndex} sx={{ px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  <AutoFixHigh sx={{ color: '#64FFDA', fontSize: 20 }} />
                                </ListItemIcon>
                                <ListItemText
                                  primary={capability}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: '#8892B0',
                                      fontSize: '0.9rem',
                                    },
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          {/* Cloud Architecture Tab */}
          <TabPanel value={currentTab} index={1}>
            <Box sx={{ p: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#64FFDA',
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Cloud-Native Architecture
              </Typography>
              
              <Grid container spacing={6}>
                <Grid item xs={12} md={6}>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#CCD6F6',
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    VESLINT's technical foundation rests on proven cloud-native architectural patterns specifically 
                    designed for maritime applications. The platform employs an event-driven microservices architecture 
                    using Apache Kafka for global vessel tracking.
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Chip
                      label="99.9% Availability"
                      sx={{
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        color: '#64FFDA',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        mr: 1,
                        mb: 1,
                      }}
                    />
                    <Chip
                      label="1M+ Messages/Minute"
                      sx={{
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        color: '#64FFDA',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        mr: 1,
                        mb: 1,
                      }}
                    />
                    <Chip
                      label="Auto-Failover"
                      sx={{
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        color: '#64FFDA',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        mr: 1,
                        mb: 1,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 47, 0.8) 100%)',
                      border: '1px solid rgba(100, 255, 218, 0.3)',
                      borderRadius: 3,
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <CloudQueue sx={{ fontSize: 48, color: '#64FFDA', mb: 2 }} />
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#CCD6F6',
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        Kappa Architecture
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#8892B0',
                          lineHeight: 1.6,
                        }}
                      >
                        Unified stream processing with replay capability for reprocessing historical data. 
                        Distributed computing frameworks handle comprehensive temporal analysis across vessel trajectories.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Typography
                variant="h5"
                sx={{
                  color: '#CCD6F6',
                  fontWeight: 600,
                  mt: 6,
                  mb: 3,
                }}
              >
                Key Architecture Components
              </Typography>

              <Grid container spacing={3}>
                {[
                  {
                    title: 'Edge-to-Cloud Integration',
                    description: 'Local processing for autonomous navigation with global analytics',
                    icon: <RocketLaunch />,
                  },
                  {
                    title: 'Multi-Zone Data Lake',
                    description: 'Apache Parquet columnar storage with Apache Iceberg ACID properties',
                    icon: <Analytics />,
                  },
                  {
                    title: 'MLOps Pipeline',
                    description: 'Continuous model training, deployment, and monitoring',
                    icon: <Engineering />,
                  },
                  {
                    title: 'Security Framework',
                    description: 'End-to-end encryption with zero-trust architecture',
                    icon: <Shield />,
                  },
                ].map((component, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card
                        sx={{
                          background: 'rgba(10, 25, 47, 0.6)',
                          border: '1px solid rgba(100, 255, 218, 0.2)',
                          borderRadius: 2,
                          '&:hover': {
                            border: '1px solid rgba(100, 255, 218, 0.4)',
                            transform: 'translateY(-4px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ color: '#64FFDA', mr: 2 }}>
                              {component.icon}
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#CCD6F6',
                                fontWeight: 600,
                                fontSize: '1rem',
                              }}
                            >
                              {component.title}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: '#8892B0',
                              lineHeight: 1.6,
                            }}
                          >
                            {component.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          {/* Market Analysis Tab */}
          <TabPanel value={currentTab} index={2}>
            <Box sx={{ p: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#64FFDA',
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Massive Market Opportunity
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#CCD6F6',
                  mb: 6,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                The maritime surveillance market presents compelling growth dynamics with projected expansion from 
                $24.71 billion in 2024 to $47.34 billion by 2030. Multiple customer segments drive this unprecedented growth.
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    title: 'Commercial Shipping',
                    subtitle: 'Largest Addressable Segment',
                    value: '$100K',
                    description: 'Annual savings per vessel through AI optimization',
                    details: ['10-30% fuel consumption reduction', 'Route optimization', 'Predictive maintenance'],
                    icon: <Satellite />,
                    color: '#64FFDA',
                  },
                  {
                    title: 'Port Authorities',
                    subtitle: 'Highest-Growth Segment',
                    value: '127%',
                    description: 'Growth rate in smart port initiatives',
                    details: ['Traffic management integration', 'Security screening', 'Operational optimization'],
                    icon: <AccountBalance />,
                    color: '#4FD1C7',
                  },
                  {
                    title: 'Naval & Defense',
                    subtitle: 'Essential Security Enabler',
                    value: '45%',
                    description: 'Projected compound annual growth rate',
                    details: ['Maritime domain awareness', 'Autonomous systems', 'Threat detection'],
                    icon: <Security />,
                    color: '#FFC107',
                  },
                ].map((segment, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card
                        sx={{
                          background: `linear-gradient(135deg, ${segment.color}15 0%, rgba(17, 34, 64, 0.8) 100%)`,
                          border: `1px solid ${segment.color}40`,
                          borderRadius: 3,
                          height: '100%',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: `0 20px 40px ${segment.color}20`,
                          },
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Box sx={{ color: segment.color, fontSize: 48, mb: 2 }}>
                              {segment.icon}
                            </Box>
                            <Typography
                              variant="h4"
                              sx={{
                                color: segment.color,
                                fontWeight: 700,
                                mb: 1,
                              }}
                            >
                              {segment.value}
                            </Typography>
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#CCD6F6',
                                fontWeight: 600,
                                mb: 1,
                              }}
                            >
                              {segment.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#8892B0',
                                mb: 2,
                              }}
                            >
                              {segment.subtitle}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#CCD6F6',
                                fontWeight: 500,
                              }}
                            >
                              {segment.description}
                            </Typography>
                          </Box>

                          <List dense>
                            {segment.details.map((detail, detailIndex) => (
                              <ListItem key={detailIndex} sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      borderRadius: '50%',
                                      backgroundColor: segment.color,
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={detail}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: '#8892B0',
                                      fontSize: '0.85rem',
                                    },
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>

          {/* Future Technologies Tab */}
          <TabPanel value={currentTab} index={3}>
            <Box sx={{ p: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: '#64FFDA',
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Breakthrough Technologies
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  color: '#CCD6F6',
                  mb: 6,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                Revolutionary technologies are transforming maritime intelligence capabilities. VESLINT integrates 
                cutting-edge innovations to define the future of maritime surveillance and operational optimization.
              </Typography>

              <Grid container spacing={4}>
                {[
                  {
                    title: 'Satellite Constellation Technologies',
                    description: 'Space-based autonomous detection with onboard AI processing',
                    features: ['ESA Φsat-2 mission integration', '3-hour revisit capability', 'Dark vessel detection'],
                    status: 'Active Development',
                    progress: 85,
                    icon: <Satellite />,
                  },
                  {
                    title: 'Federated Learning Frameworks',
                    description: 'Privacy-preserving collaboration between maritime organizations',
                    features: ['Multi-organization threat detection', 'Data sovereignty preservation', 'Shared intelligence'],
                    status: 'Research Phase',
                    progress: 70,
                    icon: <Psychology />,
                  },
                  {
                    title: 'Digital Twin Technologies',
                    description: 'Comprehensive vessel and port simulations for predictive analytics',
                    features: ['Energy optimization', 'Emergency scenario training', 'Lifecycle management'],
                    status: 'Prototype Ready',
                    progress: 92,
                    icon: <Engineering />,
                  },
                  {
                    title: 'Quantum Computing Applications',
                    description: 'Revolutionary capabilities in complex route optimization',
                    features: ['Quantum-enhanced security', 'Advanced pattern recognition', 'Vast dataset processing'],
                    status: 'Future Integration',
                    progress: 45,
                    icon: <AutoFixHigh />,
                  },
                ].map((tech, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                      <Card
                        sx={{
                          background: 'rgba(10, 25, 47, 0.8)',
                          border: '1px solid rgba(100, 255, 218, 0.2)',
                          borderRadius: 3,
                          height: '100%',
                          '&:hover': {
                            border: '1px solid rgba(100, 255, 218, 0.4)',
                            boxShadow: '0 12px 40px rgba(100, 255, 218, 0.1)',
                          },
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        <CardContent sx={{ p: 4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Box sx={{ color: '#64FFDA', mr: 2, fontSize: 32 }}>
                              {tech.icon}
                            </Box>
                            <Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#CCD6F6',
                                  fontWeight: 600,
                                  mb: 0.5,
                                }}
                              >
                                {tech.title}
                              </Typography>
                              <Chip
                                label={tech.status}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                                  color: '#64FFDA',
                                  border: '1px solid rgba(100, 255, 218, 0.3)',
                                  fontSize: '0.75rem',
                                }}
                              />
                            </Box>
                          </Box>

                          <Typography
                            variant="body1"
                            sx={{
                              color: '#8892B0',
                              mb: 3,
                              lineHeight: 1.6,
                            }}
                          >
                            {tech.description}
                          </Typography>

                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ color: '#8892B0' }}>
                                Development Progress
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#64FFDA' }}>
                                {tech.progress}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={tech.progress}
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#64FFDA',
                                  borderRadius: 3,
                                },
                              }}
                            />
                          </Box>

                          <List dense>
                            {tech.features.map((feature, featureIndex) => (
                              <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <Box
                                    sx={{
                                      width: 4,
                                      height: 4,
                                      borderRadius: '50%',
                                      backgroundColor: '#64FFDA',
                                    }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={feature}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: '#8892B0',
                                      fontSize: '0.9rem',
                                    },
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>
        </Card>

        {/* Conclusion Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(17, 34, 64, 0.8) 100%)',
              border: '1px solid rgba(100, 255, 218, 0.3)',
              borderRadius: 4,
            }}
          >
            <CardContent sx={{ p: 8, textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  color: '#64FFDA',
                  fontWeight: 600,
                  mb: 4,
                }}
              >
                Defining the Future of Maritime Intelligence
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: '#CCD6F6',
                  maxWidth: '900px',
                  mx: 'auto',
                  lineHeight: 1.8,
                  mb: 4,
                }}
              >
                VESLINT represents the convergence of breakthrough AI technologies, cloud-native scalability, 
                and comprehensive regulatory compliance in a unified maritime intelligence platform. With proven 
                performance metrics and strategic market positioning, VESLINT establishes the foundation for 
                market leadership in the rapidly expanding maritime intelligence sector.
              </Typography>

              <Grid container spacing={3} sx={{ mt: 4 }}>
                {[
                  { value: '35min', label: 'Extended Anomaly Detection' },
                  { value: '74%', label: 'Safety Event Reduction' },
                  { value: '25%', label: 'Operational Cost Reduction' },
                  { value: '327+', label: 'Simultaneous Vessel Tracking' },
                ].map((metric, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: '#64FFDA',
                          fontWeight: 700,
                          mb: 1,
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#8892B0',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                        }}
                      >
                        {metric.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResearchPage;
