import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

/**
 * HUD-style Data Card Component
 * Displays metrics in a futuristic, glassmorphic card design
 */
const DataCard: React.FC<DataCardProps> = ({ title, value, icon, subtitle, trend }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return '#64FFDA';
      case 'down': return '#FF6B6B';
      default: return '#8892B0';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card
        sx={{
          height: '100%',
          background: 'rgba(17, 34, 64, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(100, 255, 218, 0.2)',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${getTrendColor()} 0%, transparent 100%)`,
          },
          '&:hover': {
            border: '1px solid rgba(100, 255, 218, 0.4)',
            boxShadow: '0 8px 32px rgba(100, 255, 218, 0.1)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#8892B0',
                textTransform: 'uppercase',
                fontWeight: 500,
                letterSpacing: '0.1em',
              }}
            >
              {title}
            </Typography>
            {icon && (
              <Box sx={{ color: '#64FFDA', opacity: 0.7 }}>
                {icon}
              </Box>
            )}
          </Box>
          
          <Typography
            variant="h3"
            sx={{
              color: '#CCD6F6',
              fontWeight: 700,
              mb: subtitle ? 1 : 0,
              fontFamily: "'Inter', monospace",
            }}
          >
            {value}
          </Typography>
          
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: getTrendColor(),
                fontWeight: 500,
              }}
            >
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DataCard;