import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Alert,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '../hooks/useAuth';
import { functions } from '../firebase-config';
import { httpsCallable } from 'firebase/functions';
import { useNavigate } from 'react-router-dom';
import MarineCadastreLink from '../components/MarineCadastreLink';

/**
 * Enhanced New Analysis Page with professional file upload interface
 * Features drag-and-drop, file validation, and Marine Cadastre integration
 */
const NewAnalysisPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      setError('Please upload a valid CSV or ZIP file');
      return;
    }
    
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Validate file size (50MB limit)
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/zip': ['.zip'],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleBeginAnalysis = async () => {
    if (!file || !user) return;
    
    setLoading(true);
    setError('');
    setUploadProgress(0);

    try {
      const getUploadUrl = httpsCallable(functions, 'get_upload_url');
      const result: any = await getUploadUrl({ 
        fileName: file.name, 
        contentType: file.type 
      });
      
      const url = result.data as string;
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      await fetch(url, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      setUploadProgress(100);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      console.error('Failed to start analysis:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                color: '#CCD6F6',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Launch New Analysis
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: '#8892B0',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Upload your AIS data and let our AI models classify vessels with precision
            </Typography>
          </Box>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 4,
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  '& .MuiAlert-message': {
                    color: '#FF6B6B',
                  },
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}

          <Card
            sx={{
              background: 'rgba(17, 34, 64, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              borderRadius: 4,
              mb: 4,
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <div
                {...getRootProps()}
                style={{
                  border: `2px dashed ${isDragActive ? '#64FFDA' : 'rgba(100, 255, 218, 0.3)'}`,
                  borderRadius: 16,
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isDragActive ? 'rgba(100, 255, 218, 0.05)' : 'transparent',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                <input {...getInputProps()} />
                
                <motion.div
                  animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: 80,
                      color: isDragActive ? '#64FFDA' : '#8892B0',
                      mb: 3,
                    }}
                  />
                </motion.div>

                <Typography
                  variant="h5"
                  sx={{
                    color: '#CCD6F6',
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {isDragActive
                    ? 'Drop your file here'
                    : 'Drag & Drop Marine Cadastre AIS Data File'
                  }
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#8892B0',
                    mb: 2,
                  }}
                >
                  Supports .csv and .zip files up to 50MB
                </Typography>

                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    px: 4,
                    py: 1.5,
                  }}
                >
                  Or Select File from Computer
                </Button>
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box
                      sx={{
                        mt: 4,
                        p: 3,
                        background: 'rgba(100, 255, 218, 0.1)',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <InsertDriveFileIcon sx={{ color: '#64FFDA', mr: 2 }} />
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{ color: '#CCD6F6', fontWeight: 500 }}
                          >
                            {file.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#8892B0' }}>
                            {formatFileSize(file.size)}
                          </Typography>
                        </Box>
                        <CheckCircleIcon sx={{ color: '#64FFDA' }} />
                      </Box>

                      {loading && (
                        <Box sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#8892B0' }}>
                              Uploading...
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#64FFDA' }}>
                              {uploadProgress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={uploadProgress}
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
                      )}

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleBeginAnalysis}
                          disabled={loading}
                          fullWidth
                          sx={{
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                          }}
                        >
                          {loading ? 'Processing...' : 'Begin Analysis'}
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>

          <MarineCadastreLink />
        </motion.div>
      </Container>
    </Box>
  );
};

export default NewAnalysisPage;