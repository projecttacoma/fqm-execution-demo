import React from 'react';
import Grid from '@material-ui/core/Grid';
import { RadioButtonsGroup } from '../inputs/radioButtons';
import { CheckboxesGroup } from '../inputs/checkboxes';
import { MeasurementStart, MeasurementEnd } from '../inputs/datePicker';
import Button from '../inputs/calculateButton';

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
        <MeasurementStart />
        <h3>Measurement End: </h3>
        <MeasurementEnd />
      </Grid>
    </React.Fragment>
  );
}
