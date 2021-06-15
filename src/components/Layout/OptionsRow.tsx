import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CalculationOptionsButtons, MeasurementPeriodDatePicker, OutputTypeButtons, ReportTypeButtons } from '../CalculationOptions';

export default function OptionsRow() {
  return (
    <React.Fragment>
      <Grid item xs={3}>
        <h3>Output Type:</h3>
        <OutputTypeButtons />
      </Grid>
      <Grid item xs={3}>
        <h3>Calculation Options:</h3>
        <CalculationOptionsButtons />
      </Grid>
      <Grid item xs={3}>
        <h3>Report Type:</h3>
        <ReportTypeButtons />
      </Grid>
      <Grid item xs={3}>
        <MeasurementPeriodDatePicker />
      </Grid>
    </React.Fragment>
  );
}
