import React from 'react';
import { Grid } from '@mui/material';
import Lists from '../components/Lists';
import Items from '../components/Items';

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6} md={8}>
        <Lists />
      </Grid>
      <Grid item xs={6} md={4}>
        <Items />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
