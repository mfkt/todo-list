import React from 'react';
import { Grid } from '@mui/material';
import Lists from '../components/Lists';
import Items from '../components/Items';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Grid container spacing={4} style={{ height: 200 }}>
        <Grid item xs={6} md={7}>
          <Lists />
        </Grid>
        <Grid item xs={6} md={5}>
          <Items />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
