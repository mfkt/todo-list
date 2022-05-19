import React from 'react';
import { Grid } from '@mui/material';
import Lists from '../components/Lists';
import Items from '../components/Items';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        style={{ paddingLeft: 16, paddingRight: 16, marginTop: 2 }}
      >
        <Grid item xs={12} md={7}>
          <Lists />
        </Grid>
        <Grid item xs={12} md={5}>
          <Items />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
