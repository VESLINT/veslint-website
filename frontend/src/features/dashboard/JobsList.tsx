import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Skeleton,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import StatusChip from '../../components/StatusChip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DescriptionIcon from '@mui/icons-material/Description';

/**
 * Enhanced Jobs List with Crystal Intelligence design
 * Professional data table with sorting, filtering, and animations
 */
const JobsList: React.FC = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "jobs"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }));
        setJobs(jobsData);
        setLoading(false);
      });
      return unsubscribe;
    }
  }, [user]);

  const columns: GridColDef[] = [
    {
      field: 'fileName',
      headerName: 'Analysis Name',
      width: 300,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Analysis Name
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionIcon sx={{ color: '#64FFDA', fontSize: 20 }} />
          <Typography
            sx={{
              color: '#CCD6F6',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {params.value || 'Untitled Analysis'}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 200,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Created
        </Typography>
      ),
      valueGetter: (params: GridValueGetterParams) => {
        if (params.value instanceof Date) {
          return params.value.toLocaleString();
        }
        return 'Unknown';
      },
      renderCell: (params: GridRenderCellParams) => (
        <Typography sx={{ color: '#8892B0' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Status
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <StatusChip status={params.value || 'completed'} />
      ),
    },
    {
      field: 'vesselsProcessed',
      headerName: 'Vessels',
      width: 120,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Vessels
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Chip
          label={params.value || '0'}
          size="small"
          sx={{
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            color: '#64FFDA',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            fontWeight: 500,
          }}
        />
      ),
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Actions
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => {
        const isCompleted = params.row.status === 'completed' || params.row.status === 'Completed';
        
        return (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={isCompleted ? 'contained' : 'outlined'}
              size="small"
              component={Link}
              to={`/results/${params.row.id}`}
              startIcon={<VisibilityIcon />}
              disabled={!isCompleted}
              sx={{
                fontSize: '0.75rem',
                px: 2,
                py: 0.5,
                ...(isCompleted && {
                  background: 'linear-gradient(135deg, #64FFDA 0%, #4FD1C7 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #7FFFD4 0%, #64FFDA 100%)',
                  },
                }),
              }}
            >
              {isCompleted ? 'View' : 'Pending'}
            </Button>
          </motion.div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="text" width={200} height={32} />
        </Box>
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={60}
            sx={{ mb: 2, borderRadius: 1 }}
          />
        ))}
      </Box>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card
          sx={{
            background: 'rgba(17, 34, 64, 0.3)',
            border: '1px solid rgba(100, 255, 218, 0.2)',
            borderRadius: 2,
            m: 4,
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <DescriptionIcon sx={{ fontSize: 64, color: '#8892B0', mb: 2 }} />
            <Typography variant="h6" sx={{ color: '#CCD6F6', mb: 2 }}>
              No Analysis History
            </Typography>
            <Typography variant="body2" sx={{ color: '#8892B0', mb: 4 }}>
              You haven't run any analyses yet. Start your first analysis to see results here.
            </Typography>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="contained"
                component={Link}
                to="/new-analysis"
                sx={{ px: 4 }}
              >
                Start Analysis
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#CCD6F6', mb: 1 }}>
            Recent Analyses
          </Typography>
          <Typography variant="body2" sx={{ color: '#8892B0' }}>
            Track your analysis history and view results
          </Typography>
        </Box>

        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={jobs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-root': {
                backgroundColor: 'transparent',
              },
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
                color: '#8892B0',
                py: 2,
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(100, 255, 218, 0.05)',
                borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
                borderRadius: '8px 8px 0 0',
              },
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.05)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                },
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid rgba(100, 255, 218, 0.2)',
                backgroundColor: 'rgba(100, 255, 218, 0.02)',
              },
              '& .MuiTablePagination-root': {
                color: '#8892B0',
              },
              '& .MuiTablePagination-selectIcon': {
                color: '#64FFDA',
              },
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default JobsList;