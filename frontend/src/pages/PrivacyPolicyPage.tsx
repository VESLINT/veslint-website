import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Privacy Policy Page
 * Comprehensive privacy policy tailored for VESLINT's AIS data processing
 */
const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `
        We collect information you provide directly to us, such as when you create an account, upload AIS data files, 
        or contact us for support. This may include:
        
        • Personal Information: Name, email address, and account credentials
        • AIS Data Files: Maritime vessel tracking data that you upload for analysis
        • Usage Information: How you interact with our platform, including analysis history and preferences
        • Technical Information: IP address, browser type, device information, and access times
      `,
    },
    {
      title: 'How We Use Your Data',
      content: `
        We use the information we collect to:
        
        • Provide and improve our vessel classification services
        • Process and analyze your uploaded AIS data files
        • Communicate with you about your account and our services
        • Provide technical support and respond to your inquiries
        • Ensure the security and integrity of our platform
        • Comply with legal obligations and protect our rights
        
        We do not sell, rent, or share your personal information with third parties for their marketing purposes.
      `,
    },
    {
      title: 'Data Security',
      content: `
        We implement robust security measures to protect your information:
        
        • End-to-end encryption for all data transmissions
        • Secure cloud infrastructure with enterprise-grade security
        • Regular security audits and vulnerability assessments
        • Access controls and authentication mechanisms
        • Data backup and disaster recovery procedures
        
        While we strive to protect your information, no method of transmission over the internet is 100% secure.
      `,
    },
    {
      title: 'Data Retention',
      content: `
        We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:
        
        • Account Information: Retained while your account is active
        • AIS Data Files: Retained for analysis purposes and may be anonymized for research
        • Usage Logs: Retained for up to 12 months for security and service improvement
        • Communication Records: Retained for up to 3 years for support purposes
        
        You may request deletion of your data by contacting us at privacy@veslint.com.
      `,
    },
    {
      title: 'Your Rights',
      content: `
        Depending on your location, you may have certain rights regarding your personal information:
        
        • Access: Request access to your personal information
        • Correction: Request correction of inaccurate information
        • Deletion: Request deletion of your personal information
        • Portability: Request transfer of your data to another service
        • Restriction: Request limitation of processing your data
        
        To exercise these rights, please contact us at privacy@veslint.com.
      `,
    },
    {
      title: 'Cookies and Tracking',
      content: `
        We use cookies and similar technologies to:
        
        • Remember your preferences and settings
        • Analyze platform usage and performance
        • Provide personalized experiences
        • Ensure security and prevent fraud
        
        You can control cookie settings through your browser preferences.
      `,
    },
    {
      title: 'International Data Transfers',
      content: `
        Your information may be transferred to and processed in countries other than your country of residence. 
        We ensure appropriate safeguards are in place to protect your information in accordance with applicable 
        data protection laws.
      `,
    },
    {
      title: 'Updates to This Policy',
      content: `
        We may update this Privacy Policy from time to time. We will notify you of any material changes by 
        posting the new policy on our website and updating the "Last Updated" date. Your continued use of 
        our services after such updates constitutes acceptance of the revised policy.
      `,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h2"
              sx={{
                color: '#CCD6F6',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Privacy Policy
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#8892B0',
                mb: 2,
              }}
            >
              Last Updated: January 2024
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#8892B0',
              }}
            >
              Your privacy is important to us. This policy explains how VESLINT collects, 
              uses, and protects your information.
            </Typography>
          </Box>

          {/* Policy Sections */}
          <Card
            sx={{
              background: 'rgba(17, 34, 64, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Box sx={{ mb: 6 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#64FFDA',
                        fontWeight: 600,
                        mb: 3,
                      }}
                    >
                      {section.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#CCD6F6',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {section.content}
                    </Typography>
                  </Box>
                </motion.div>
              ))}

              <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid rgba(100, 255, 218, 0.2)' }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#64FFDA',
                    fontWeight: 600,
                    mb: 3,
                  }}
                >
                  Contact Us
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#CCD6F6',
                    lineHeight: 1.8,
                  }}
                >
                  If you have any questions about this Privacy Policy or our data practices, 
                  please contact us at:
                  <br /><br />
                  Email: privacy@veslint.com<br />
                  General Inquiries: info@veslint.com<br />
                  Technical Support: support@veslint.com
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;