import React from 'react';
import { Box, Container, Typography, Link, Grid, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  LinkedIn, 
  Twitter, 
  GitHub, 
  Email, 
  Phone, 
} from '@mui/icons-material';

/**
 * Professional Enterprise Footer Component
 */
const Footer: React.FC = () => {

  const contactInfo = [
    { icon: <Email sx={{ fontSize: 16 }} />, text: 'support@veslint.com', href: 'mailto:support@veslint.com' },
    { icon: <Phone sx={{ fontSize: 16 }} />, text: '+216 (98) 255-636', href: 'tel:+21698255636' },
  ];

  const socialLinks = [
    { icon: <LinkedIn />, href: 'https://www.linkedin.com/in/oussama-ben-salem-1412a7372/', label: 'LinkedIn' },
    { icon: <Twitter />, href: 'https://twitter.com/veslint', label: 'Twitter' },
    { icon: <GitHub />, href: 'https://github.com/VESLINT/VESLINT', label: 'GitHub' },
  ];


  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #0A192F 0%, #112240 50%, #1A2B4D 100%)',
        borderTop: '2px solid rgba(100, 255, 218, 0.2)',
        mt: 'auto',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(100, 255, 218, 0.03) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Compact Footer Content */}
        <Box sx={{ py: 2 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2
          }}>
            {/* Company Brand Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src="/assets/logo.png"
                alt="VESLINT Logo"
                sx={{
                  height: 32,
                  width: 'auto',
                }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#64FFDA',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    fontSize: '1rem',
                  }}
                >
                  VESLINT
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#8892B0',
                    fontSize: '0.65rem',
                    letterSpacing: '0.05em',
                    display: 'block',
                    mt: -0.5,
                  }}
                >
                  VEssel Surveillance & Logging INTelligence
                </Typography>
              </Box>
            </Box>

            {/* Contact & Social Links */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {/* Contact Information */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {contactInfo.map((contact, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Box sx={{ color: '#64FFDA' }}>{contact.icon}</Box>
                    {contact.href ? (
                      <Link
                        href={contact.href}
                        sx={{
                          color: '#8892B0',
                          textDecoration: 'none',
                          fontSize: '0.75rem',
                          '&:hover': { color: '#64FFDA' },
                        }}
                      >
                        {contact.text}
                      </Link>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: '#8892B0', fontSize: '0.75rem' }}
                      >
                        {contact.text}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>

              {/* Social Links */}
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: '#8892B0',
                      border: '1px solid rgba(100, 255, 218, 0.2)',
                      borderRadius: 1,
                      width: 28,
                      height: 28,
                      '&:hover': {
                        color: '#64FFDA',
                        borderColor: '#64FFDA',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                      },
                    }}
                    aria-label={social.label}
                  >
                    {React.cloneElement(social.icon, { sx: { fontSize: 14 } })}
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Legal Links & Copyright */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-end' }
            }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Link
                  component={RouterLink}
                  to="/privacy"
                  sx={{
                    color: '#8892B0',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    '&:hover': { color: '#64FFDA' },
                  }}
                >
                  Privacy Policy
                </Link>
                <Typography sx={{ color: '#8892B0', fontSize: '0.75rem' }}>•</Typography>
                <Link
                  component={RouterLink}
                  to="/terms"
                  sx={{
                    color: '#8892B0',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    '&:hover': { color: '#64FFDA' },
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#8892B0',
                  fontSize: '0.75rem',
                }}
              >
                © 2025 VESLINT Technologies. All Rights Reserved.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
