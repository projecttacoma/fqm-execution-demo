import React, { Dispatch, SetStateAction } from 'react';
import Grid from '@material-ui/core/Grid';
import { RadioButtonsGroup } from '../inputs/radioButtons';
import { CheckboxesGroup } from '../inputs/checkboxes';
import { MeasurementDatePicker } from '../inputs/datePicker';

interface Props {
  setOutputType: Dispatch<SetStateAction<string>>;
  outputType: string;
  setMeasurementPeriodStart: Dispatch<SetStateAction<Date | null>>;
  measurementPeriodStart: Date | null;
  setMeasurementPeriodEnd: Dispatch<SetStateAction<Date | null>>;
  measurementPeriodEnd: Date | null;
  setCalculationOptions: Dispatch<SetStateAction<any>>;
  calculationOptions: any;
}
export default function OptionsRow(props: Props) {
  return (
    <React.Fragment>
      <Grid item xs={4}>
        <h3>Output Type:</h3>
        <RadioButtonsGroup setOutputType={props.setOutputType} outputType={props.outputType} />
      </Grid>
      <Grid item xs={4}>
        <h3>Calculation Options:</h3>
        <CheckboxesGroup
          setCalculationOptions={props.setCalculationOptions}
          calculationOptions={props.calculationOptions}
        />
      </Grid>
      <Grid item xs={4}>
        <h3>Measurement Start: </h3>
        <MeasurementDatePicker
          setMeasurementPeriodDate={props.setMeasurementPeriodStart}
          measurementPeriodDate={props.measurementPeriodStart}
        />
        <h3>Measurement End: </h3>
        <MeasurementDatePicker
          setMeasurementPeriodDate={props.setMeasurementPeriodEnd}
          measurementPeriodDate={props.measurementPeriodEnd}
        />
      </Grid>
    </React.Fragment>
  );
}
