import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Skeleton,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { DataGrid, GridColDef, GridRowId, GridRowParams } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../firebase-config';
import { collection, doc, onSnapshot, query, orderBy, limit, startAfter, getDocs, DocumentData } from 'firebase/firestore';
import DataCard from '../components/DataCard';
import StatusChip from '../components/StatusChip';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

/**
 * Enhanced Results Page with multi-tabbed dashboard
 * Displays analysis results with performance metrics and visualizations
 */
const ResultsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<any>(null);
  const [summaries, setSummaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastVisible, setLastVisible] = useState<DocumentData | null>(null);
  const [selectedVessel, setSelectedVessel] = useState<any | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (jobId) {
      const jobRef = doc(db, "analysisJobs", jobId);
      const unsubscribe = onSnapshot(jobRef, (doc) => {
        setJob(doc.data());
      });
      return unsubscribe;
    }
  }, [jobId]);

  const fetchSummaries = useCallback(async (loadMore = false) => {
    if (jobId) {
      if (loadMore) setLoadingMore(true); else setLoading(true);

      const summariesRef = collection(db, "analysisJobs", jobId, "vesselSummaries");
      let q = query(summariesRef, orderBy("MMSI"), limit(10));
      if (loadMore && lastVisible) {
        q = query(summariesRef, orderBy("MMSI"), startAfter(lastVisible), limit(10));
      }
      const documentSnapshots = await getDocs(q);
      const newSummaries = documentSnapshots.docs.map((doc: DocumentData) => ({ ...doc.data(), id: doc.id }));

      if(loadMore) setSummaries((prev: any[]) => [...prev, ...newSummaries]); else setSummaries(newSummaries);

      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      if (loadMore) setLoadingMore(false); else setLoading(false);
    }
  }, [jobId, lastVisible]);

  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  const handleRowClick = (params: GridRowParams) => {
    setSelectedVessel(params.row);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const columns: GridColDef[] = [
    { 
      field: 'MMSI', 
      headerName: 'MMSI', 
      width: 150,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          MMSI
        </Typography>
      ),
    },
    { 
      field: 'VesselName', 
      headerName: 'Vessel Name', 
      width: 200,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Vessel Name
        </Typography>
      ),
    },
    { 
      field: 'predictedVesselType', 
      headerName: 'Predicted Type', 
      width: 200,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Predicted Type
        </Typography>
      ),
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          size="small"
          sx={{
            backgroundColor: 'rgba(100, 255, 218, 0.1)',
            color: '#64FFDA',
            border: '1px solid rgba(100, 255, 218, 0.3)',
          }}
        />
      ),
    },
    { 
      field: 'PredictionConfidence', 
      headerName: 'Confidence', 
      width: 150,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Confidence
        </Typography>
      ),
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value > 0.8 ? '#64FFDA' : params.value > 0.6 ? '#FFC107' : '#FF6B6B',
            fontWeight: 500,
          }}
        >
          {(params.value * 100).toFixed(1)}%
        </Typography>
      ),
    },
    { 
      field: 'MeanSOG', 
      headerName: 'Mean SOG', 
      width: 120,
      renderHeader: () => (
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#CCD6F6' }}>
          Mean SOG
        </Typography>
      ),
      renderCell: (params) => (
        <Typography sx={{ color: '#8892B0' }}>
          {params.value?.toFixed(2) || 'N/A'}
        </Typography>
      ),
    },
  ];

  const mockMetrics = {
    accuracy: 94.2,
    macroF1: 91.8,
    weightedF1: 93.5,
    totalVessels: summaries.length,
  };

  const TabPanel = ({ children, value, index }: any) => (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box sx={{ minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#CCD6F6',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Analysis Results
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#8892B0',
              }}
            >
              Detailed vessel classification results and performance metrics
            </Typography>
          </Box>

          {/* Job Summary Card */}
          {loading ? (
            <Skeleton variant="rectangular" height={120} sx={{ mb: 4, borderRadius: 2 }} />
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  background: 'rgba(17, 34, 64, 0.6)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: 3,
                  mb: 4,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" sx={{ color: '#CCD6F6', mb: 1 }}>
                        Job Summary
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#8892B0', mb: 2 }}>
                        <strong>Filename:</strong> {job?.originalFilename || 'Unknown'}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#8892B0' }}>
                        <strong>Processing Time:</strong> {job?.processingTime || 'N/A'}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                      <StatusChip status={job?.status || 'completed'} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Tabbed Interface */}
          <Card
            sx={{
              background: 'rgba(17, 34, 64, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              borderRadius: 3,
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
                    '&.Mui-selected': {
                      color: '#64FFDA',
                    },
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#64FFDA',
                  },
                }}
              >
                <Tab label="Performance Metrics" />
                <Tab label="Vessel Data" />
                <Tab label="Visualizations" />
              </Tabs>
            </Box>

            {/* Performance Metrics Tab */}
            <TabPanel value={currentTab} index={0}>
              <Box sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6} md={3}>
                    <DataCard
                      title="Overall Accuracy"
                      value={`${mockMetrics.accuracy}%`}
                      icon={<AssessmentIcon />}
                      trend="up"
                      subtitle="Excellent performance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DataCard
                      title="Macro F1-Score"
                      value={`${mockMetrics.macroF1}%`}
                      icon={<TrendingUpIcon />}
                      trend="up"
                      subtitle="Strong classification"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DataCard
                      title="Weighted F1-Score"
                      value={`${mockMetrics.weightedF1}%`}
                      icon={<PrecisionManufacturingIcon />}
                      trend="up"
                      subtitle="Balanced performance"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <DataCard
                      title="Total Vessels"
                      value={mockMetrics.totalVessels}
                      icon={<AssessmentIcon />}
                      trend="neutral"
                      subtitle="Classified successfully"
                    />
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Vessel Data Tab */}
            <TabPanel value={currentTab} index={1}>
              <Box sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={8}>
                    <Box sx={{ height: 600, width: '100%' }}>
                      <DataGrid
                        rows={summaries}
                        columns={columns}
                        getRowId={(row: any) => row.id as GridRowId}
                        onRowClick={handleRowClick}
                        loading={loading}
                        sx={{
                          border: 'none',
                          '& .MuiDataGrid-root': {
                            backgroundColor: 'transparent',
                          },
                          '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid rgba(100, 255, 218, 0.1)',
                            color: '#8892B0',
                          },
                          '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(100, 255, 218, 0.05)',
                            borderBottom: '1px solid rgba(100, 255, 218, 0.2)',
                          },
                          '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'rgba(100, 255, 218, 0.05)',
                          },
                        }}
                      />
                    </Box>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button
                        onClick={() => fetchSummaries(true)}
                        disabled={loadingMore || !lastVisible}
                        variant="outlined"
                        sx={{ mt: 2 }}
                      >
                        {loadingMore ? 'Loading...' : 'Load More'}
                      </Button>
                    </motion.div>
                  </Grid>

                  <Grid item xs={12} lg={4}>
                    <Card
                      sx={{
                        background: 'rgba(10, 25, 47, 0.8)',
                        border: '1px solid rgba(100, 255, 218, 0.2)',
                        borderRadius: 2,
                        height: 600,
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ color: '#CCD6F6', mb: 3 }}>
                          Vessel Details
                        </Typography>
                        
                        <AnimatePresence mode="wait">
                          {selectedVessel ? (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box sx={{ mb: 4 }}>
                                <Typography variant="body2" sx={{ color: '#8892B0', mb: 1 }}>
                                  <strong>MMSI:</strong> {selectedVessel.MMSI}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#8892B0', mb: 1 }}>
                                  <strong>Vessel Name:</strong> {selectedVessel.VesselName}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#8892B0', mb: 3 }}>
                                  <strong>Predicted Type:</strong> {selectedVessel.predictedVesselType}
                                </Typography>
                              </Box>

                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={[selectedVessel]}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 255, 218, 0.1)" />
                                  <XAxis 
                                    dataKey="VesselName" 
                                    tick={{ fill: '#8892B0', fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(100, 255, 218, 0.3)' }}
                                  />
                                  <YAxis 
                                    tick={{ fill: '#8892B0', fontSize: 12 }}
                                    axisLine={{ stroke: 'rgba(100, 255, 218, 0.3)' }}
                                  />
                                  <Tooltip 
                                    contentStyle={{
                                      backgroundColor: 'rgba(17, 34, 64, 0.9)',
                                      border: '1px solid rgba(100, 255, 218, 0.3)',
                                      borderRadius: 8,
                                      color: '#CCD6F6',
                                    }}
                                  />
                                  <Legend />
                                  <Bar dataKey="MeanSOG" fill="#64FFDA" name="Mean SOG" />
                                  <Bar dataKey="MaxSOG" fill="#4FD1C7" name="Max SOG" />
                                </BarChart>
                              </ResponsiveContainer>
                            </motion.div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Typography sx={{ color: '#8892B0', textAlign: 'center', mt: 8 }}>
                                Click on a vessel row to see detailed information
                              </Typography>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Visualizations Tab */}
            <TabPanel value={currentTab} index={2}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ color: '#CCD6F6', mb: 3 }}>
                  Analysis Visualizations
                </Typography>
                <Typography sx={{ color: '#8892B0' }}>
                  Advanced visualizations coming soon...
                </Typography>
              </Box>
            </TabPanel>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ResultsPage;