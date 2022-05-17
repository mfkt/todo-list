// @ts-ignore
import React from 'react';
// @ts-ignore
// import styled from 'styled-components';
import { CircularProgress, Box } from '@mui/material';

const ProgressStyle: React.FC = () => {
  return (
    <Box sx={{ width: 300, height: 300, display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};

export default ProgressStyle;
