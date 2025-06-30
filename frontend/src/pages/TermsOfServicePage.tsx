import React from 'react';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Terms of Service Page
 * Comprehensive terms of service for VESLINT platform usage
 */
const TermsOfServicePage: React.FC = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `
        By accessing and using the VESLINT platform, you accept and agree to be bound by these Terms of Service. 
        If you do not agree to these terms, you may not access or use our services.
        
        These terms apply to all users of the platform, including visitors, registered users, and subscribers.
      `,
    },
    {
      title: 'Description of Service',
      content: `
        VESLINT provides AI-powered vessel classification and maritime analytics services. Our platform processes 
        AIS (Automatic Identification System) data to classify vessels and provide maritime intelligence insights.
        
        Services include:
        • Vessel type classification using machine learning models
        • Maritime analytics and performance metrics
        • Data visualization and reporting tools
        • API access for integration with third-party systems
      `,
    },
    {
      title: 'User Accounts and Registration',
      content: `
        To access certain features, you must create an account and provide accurate, complete information. 
        You are responsible for:
        
        • Maintaining the confidentiality of your account credentials
        • All activities that occur under your account
        • Notifying us immediately of any unauthorized use
        • Ensuring your account information remains current and accurate
        
        You may not create accounts for anyone other than yourself without permission.
      `,
    },
    {
      title: 'Acceptable Use Policy',
      content: `
        You agree to use VESLINT in compliance with all applicable laws and regulations. You may not:
        
        • Upload malicious software, viruses, or harmful code
        • Attempt to gain unauthorized access to our systems
        • Use the service for illegal activities or to violate others' rights
        • Reverse engineer, decompile, or disassemble our software
        • Share your account credentials with third parties
        • Exceed usage limits or attempt to circumvent restrictions
        
        We reserve the right to suspend or terminate accounts that violate these terms.
      `,
    },
    {
      title: 'Data and Privacy',
      content: `
        Your use of VESLINT is subject to our Privacy Policy. By using our services, you consent to:
        
        • Collection and processing of your data as described in our Privacy Policy
        • Use of cookies and similar technologies
        • Transfer of data to our service providers and partners
        
        You retain ownership of the data you upload, but grant us license to process it for service provision.
      `,
    },
    {
      title: 'Intellectual Property Rights',
      content: `
        VESLINT and its original content, features, and functionality are owned by VESLINT and protected by international copyright, trademark, and other intellectual property laws.
        
        You may not:
        • Copy, modify, or distribute our proprietary software or content
        • Use our trademarks or branding without written permission
        • Create derivative works based on our platform
        
        You retain rights to data you upload, subject to our license to process it.
      `,
    },
    {
      title: 'Service Availability and Modifications',
      content: `
        We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to:
        
        • Modify, suspend, or discontinue services with or without notice
        • Perform maintenance that may temporarily limit access
        • Update terms of service and platform features
        
        We will provide reasonable notice of significant changes when possible.
      `,
    },
    {
      title: 'Limitation of Liability',
      content: `
        To the maximum extent permitted by law, VESLINT shall not be liable for any indirect, incidental, 
        special, consequential, or punitive damages, including but not limited to:
        
        • Loss of profits, data, or business opportunities
        • Service interruptions or delays
        • Third-party actions or content
        • Errors in analysis results or classifications
        
        Our total liability shall not exceed the amount paid by you for services in the 12 months 
        preceding the claim.
      `,
    },
    {
      title: 'Indemnification',
      content: `
        You agree to indemnify and hold harmless VESLINT, its officers, directors, employees, and agents  
        from any claims, damages, or expenses arising from:
        
        • Your use of the platform
        • Violation of these terms
        • Infringement of third-party rights
        • Your uploaded data or content
      `,
    },
    {
      title: 'Termination',
      content: `
        Either party may terminate the agreement at any time with or without cause. Upon termination:
        
        • Your access to the platform will be suspended
        • You remain liable for any outstanding obligations
        • We may delete your account and associated data
        • Provisions regarding liability and intellectual property survive termination
      `,
    },
    {
      title: 'Governing Law and Disputes',
      content: `
        These terms are governed by the laws of [Jurisdiction] without regard to conflict of law principles. 
        Any disputes will be resolved through binding arbitration in accordance with the rules of [Arbitration Body].
        
        You waive any right to participate in class actions or representative proceedings.
      `,
    },
    {
      title: 'Changes to Terms',
      content: `
        We may update these terms from time to time. Material changes will be communicated through:
        
        • Email notification to registered users
        • Prominent notice on our platform
        • Updated "Last Modified" date
        
        Continued use after changes constitutes acceptance of the updated terms.
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
              Terms of Service
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: '#8892B0',
                mb: 2,
              }}
            >
              Last Updated: June 2025
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#8892B0',
              }}
            >
              Please read these terms carefully before using the VESLINT platform.
            </Typography>
          </Box>

          {/* Terms Sections */}
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
                      {index + 1}. {section.title}
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
                  Contact Information
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#CCD6F6',
                    lineHeight: 1.8,
                  }}
                >
                  For questions regarding these Terms of Service, please contact us:
                  <br /><br />
                  Email: legal@veslint.com<br />
                  General Inquiries: info@veslint.com<br />
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TermsOfServicePage;