import React, { Dispatch, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

interface PropsStart {
  setMeasurementPeriodStart: Dispatch<Date | null>;
  measurementPeriodStart: Date | null;
}
interface PropsEnd {
  setMeasurementPeriodEnd: Dispatch<Date | null>;
  measurementPeriodEnd: Date | null;
}

function MeasurementStart(props: PropsStart) {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());

  props.setMeasurementPeriodStart(selectedDate);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={props.measurementPeriodStart} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

function MeasurementEnd(props: PropsEnd) {
  const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  props.setMeasurementPeriodEnd(selectedDate);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={props.measurementPeriodEnd} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

export { MeasurementStart, MeasurementEnd };
