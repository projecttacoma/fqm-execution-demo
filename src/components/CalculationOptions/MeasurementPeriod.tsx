import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState } from 'recoil';
import { measurementPeriodState } from '../../state';

function MeasurementPeriodDatePicker() {
  const [measurementPeriod, setMeasurementPeriod] = useRecoilState(measurementPeriodState);

  const setStart = (value: Date | null) => {
    setMeasurementPeriod({
      ...measurementPeriod,
      measurementPeriodStart: value
    });
  };

  const setEnd = (value: Date | null) => {
    setMeasurementPeriod({
      ...measurementPeriod,
      measurementPeriodEnd: value
    });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <h3>Measurement Start: </h3>
      <DatePicker value={measurementPeriod.measurementPeriodStart} format="MM/dd/yyyy" onChange={setStart} />
      <h3>Measurement End: </h3>
      <DatePicker value={measurementPeriod.measurementPeriodEnd} format="MM/dd/yyyy" onChange={setEnd} />
    </MuiPickersUtilsProvider>
  );
}

export default MeasurementPeriodDatePicker;
