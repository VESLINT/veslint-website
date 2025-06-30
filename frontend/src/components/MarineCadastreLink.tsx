import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * Custom Marine Cadastre Icon Component
 * SVG icon combining compass rose with data stream symbol
 */
const MarineCadastreIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Compass Rose */}
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M12 2L13.5 10.5L12 12L10.5 10.5L12 2Z"
      fill="currentColor"
    />
    <path
      d="M22 12L13.5 10.5L12 12L13.5 13.5L22 12Z"
      fill="currentColor"
    />
    <path
      d="M12 22L10.5 13.5L12 12L13.5 13.5L12 22Z"
      fill="currentColor"
    />
    <path
      d="M2 12L10.5 13.5L12 12L10.5 10.5L2 12Z"
      fill="currentColor"
    />
    
    {/* Data Stream Arrows */}
    <path
      d="M16 8L18 6L20 8M18 6V10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 16L6 18L8 20M6 18H10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Marine Cadastre Link Component
 * Styled link to official AIS data source with custom icon
 */
const MarineCadastreLink: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          mt: 3,
          p: 2,
          borderRadius: 2,
          background: 'rgba(17, 34, 64, 0.3)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: 'rgba(100, 255, 218, 0.05)',
            border: '1px solid rgba(100, 255, 218, 0.4)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(100, 255, 218, 0.1)',
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: '#8892B0',
            fontWeight: 500,
          }}
        >
          Need data? Access official U.S. AIS data from
        </Typography>
        
        <Link
          href="https://hub.marinecadastre.gov/pages/vesseltraffic"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#64FFDA',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: '#7FFFD4',
              textDecoration: 'underline',
            },
          }}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <MarineCadastreIcon size={20} />
          </motion.div>
          MarineCadastre.gov
        </Link>
      </Box>
    </motion.div>
  );
};

export default MarineCadastreLink;