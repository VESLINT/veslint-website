import React from 'react';
import { Chip, Box } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

interface StatusChipProps {
  status: 'Processing' | 'Completed' | 'Failed' | 'processing' | 'completed' | 'failed';
}

/**
 * Enhanced Status Chip with animations and custom styling
 * Displays processing status with appropriate colors and icons
 */
const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const normalizedStatus = status.toLowerCase();

  const getStatusConfig = () => {
    switch (normalizedStatus) {
      case 'completed':
        return {
          color: '#64FFDA',
          backgroundColor: 'rgba(100, 255, 218, 0.1)',
          borderColor: 'rgba(100, 255, 218, 0.3)',
          icon: <CheckCircleIcon sx={{ fontSize: 16 }} />,
          label: 'Completed',
          animation: { scale: [1, 1.05, 1] },
        };
      case 'failed':
        return {
          color: '#FF6B6B',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          borderColor: 'rgba(255, 107, 107, 0.3)',
          icon: <ErrorIcon sx={{ fontSize: 16 }} />,
          label: 'Failed',
          animation: { scale: [1, 1.05, 1] },
        };
      case 'processing':
      default:
        return {
          color: '#FFC107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          borderColor: 'rgba(255, 193, 7, 0.3)',
          icon: <HourglassEmptyIcon sx={{ fontSize: 16 }} />,
          label: 'Processing',
          animation: { 
            rotate: [0, 180, 360],
            transition: { duration: 2, repeat: Infinity, ease: "linear" }
          },
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Chip
        icon={
          <Box
            component={motion.div}
            animate={normalizedStatus === 'processing' ? config.animation : {}}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {config.icon}
          </Box>
        }
        label={config.label}
        variant="outlined"
        size="small"
        sx={{
          color: config.color,
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
          fontWeight: 500,
          '& .MuiChip-icon': {
            color: config.color,
          },
          '&:hover': {
            backgroundColor: config.backgroundColor,
            boxShadow: `0 4px 12px ${config.color}20`,
          },
        }}
      />
    </motion.div>
  );
};

export default StatusChip;