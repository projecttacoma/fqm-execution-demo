import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useRecoilState, useRecoilValue } from 'recoil';
import { measurementPeriodState, outputTypeState } from '../../state';

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

  const outputType = useRecoilValue(outputTypeState);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <h3>Measurement Start: </h3>
      <DatePicker 
      value={measurementPeriod.measurementPeriodStart} 
      format="MM/dd/yyyy" 
      onChange={setStart} 
      disabled={outputType === 'dataRequirement'}
      />
      <h3>Measurement End: </h3>
      <DatePicker 
      value={measurementPeriod.measurementPeriodEnd} 
      format="MM/dd/yyyy" 
      onChange={setEnd} 
      disabled={outputType === 'dataRequirement'}
      />
    </MuiPickersUtilsProvider>
  );
}

export default MeasurementPeriodDatePicker;
