import React from 'react';
import Grid from '@material-ui/core/Grid';
import { RadioButtonsGroup } from '../inputs/radioButtons';
import { CheckboxesGroup } from '../inputs/checkboxes';
import { MeasurementDateStart, MeasurementDateEnd } from '../inputs/datePicker';

export default function OptionsRow() {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <h3>Output Type:</h3>
        <RadioButtonsGroup />
      </Grid>
      <Grid item xs={4}>
        <h3>Calculation Options:</h3>
        <CheckboxesGroup />
      </Grid>
      <Grid item xs={4}>
        <h3>Measurement Start: </h3>
        <MeasurementDateStart />
        <h3>Measurement End: </h3>
        <MeasurementDateEnd />
      </Grid>
    </React.Fragment>
  );
}
