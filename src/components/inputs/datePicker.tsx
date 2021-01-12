import React, { useContext } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { OptionsRowContext } from '../../contexts/optionsRowContext';

function MeasurementDateStart() {
  const OptionsRowInfo = useContext(OptionsRowContext);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={OptionsRowInfo.measurementPeriodStart}
        format="MM/dd/yyyy"
        onChange={OptionsRowInfo.setMeasurementPeriodStart}
      />
    </MuiPickersUtilsProvider>
  );
}
function MeasurementDateEnd() {
  const OptionsRowInfo = useContext(OptionsRowContext);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        value={OptionsRowInfo.measurementPeriodEnd}
        format="MM/dd/yyyy"
        onChange={OptionsRowInfo.setMeasurementPeriodEnd}
      />
    </MuiPickersUtilsProvider>
  );
}

export { MeasurementDateStart, MeasurementDateEnd };
