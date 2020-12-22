import React, { Dispatch, SetStateAction } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface Props {
  setMeasurementPeriodDate: Dispatch<SetStateAction<Date | null>>;
  measurementPeriodDate: Date | null;
}

function MeasurementDatePicker(props: Props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={props.measurementPeriodDate} format="MM/dd/yyyy" onChange={props.setMeasurementPeriodDate} />
    </MuiPickersUtilsProvider>
  );
}

export { MeasurementDatePicker };
