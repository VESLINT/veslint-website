import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import SupportIcon from '@mui/icons-material/Support';
import SendIcon from '@mui/icons-material/Send';

/**
 * Contact Us Page with professional contact information and form
 * Provides multiple ways to reach the VESLINT team
 */
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real implementation, this would send the form data to a backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
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
                Get in Touch
              </Typography>
              
              <Typography
                variant="h5"
                sx={{
                  color: '#8892B0',
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                We're here to help and answer any question you might have. 
                We look forward to hearing from you.
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Typography
                  variant="h4"
                  sx={{
                    color: '#CCD6F6',
                    fontWeight: 600,
                    mb: 4,
                  }}
                >
                  Contact Information
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        background: 'rgba(17, 34, 64, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        borderRadius: 3,
                        '&:hover': {
                          border: '1px solid rgba(100, 255, 218, 0.4)',
                          boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <EmailIcon sx={{ color: '#64FFDA', fontSize: 32, mr: 2 }} />
                          <Typography
                            variant="h6"
                            sx={{ color: '#CCD6F6', fontWeight: 600 }}
                          >
                            General Inquiries
                          </Typography>
                        </Box>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#8892B0',
                            mb: 2,
                          }}
                        >
                          For general questions about VESLINT, partnerships, or business inquiries.
                        </Typography>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#64FFDA',
                            fontFamily: 'monospace',
                          }}
                        >
                          info@veslint.com
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12}>
                    <Card
                      sx={{
                        background: 'rgba(17, 34, 64, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        borderRadius: 3,
                        '&:hover': {
                          border: '1px solid rgba(100, 255, 218, 0.4)',
                          boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <SupportIcon sx={{ color: '#64FFDA', fontSize: 32, mr: 2 }} />
                          <Typography
                            variant="h6"
                            sx={{ color: '#CCD6F6', fontWeight: 600 }}
                          >
                            Technical Support
                          </Typography>
                        </Box>
                        
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#8892B0',
                            mb: 2,
                          }}
                        >
                          For technical assistance, troubleshooting, or platform-related questions.
                        </Typography>
                        
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#64FFDA',
                            fontFamily: 'monospace',
                          }}
                        >
                          support@veslint.com
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <Card
                  sx={{
                    background: 'rgba(17, 34, 64, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(100, 255, 218, 0.2)',
                    borderRadius: 3,
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#CCD6F6',
                        fontWeight: 600,
                        mb: 4,
                      }}
                    >
                      Send us a Message
                    </Typography>

                    {submitted && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity="success"
                          sx={{
                            mb: 3,
                            backgroundColor: 'rgba(100, 255, 218, 0.1)',
                            border: '1px solid rgba(100, 255, 218, 0.3)',
                            '& .MuiAlert-message': {
                              color: '#64FFDA',
                            },
                          }}
                        >
                          Thank you for your message! We'll get back to you soon.
                        </Alert>
                      </motion.div>
                    )}

                    <Box component="form" onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            name="name"
                            label="Your Name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="subject"
                            label="Subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            name="message"
                            label="Message"
                            multiline
                            rows={6}
                            value={formData.message}
                            onChange={handleInputChange}
                          />
                        </Grid>
                        
                        <Grid item xs={12}>
                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              endIcon={<SendIcon />}
                              fullWidth
                              sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                              }}
                            >
                              Send Message
                            </Button>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ContactPage;