import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

const Loading = () => (
  <Grid container justify="center">
    <CircularProgress />
  </Grid>
);

export default Loading;
