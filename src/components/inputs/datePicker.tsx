import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

let  CalculationOptionsMeasurementStart='';
let  CalculationOptionsMeasurementEnd='';


 function MeasurementStart() {
    const [selectedDate, handleDateChange] = useState<Date | null>(new Date())
   
  CalculationOptionsMeasurementStart=JSON.stringify(selectedDate);
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker value={selectedDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
  );
}

function MeasurementEnd() {
    const [selectedDate, handleDateChange] = useState<Date | null>(new Date())
    CalculationOptionsMeasurementEnd=JSON.stringify(selectedDate);

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker value={selectedDate} onChange={handleDateChange} />
      </MuiPickersUtilsProvider>
    );
  }
  
  export {MeasurementStart, CalculationOptionsMeasurementStart, MeasurementEnd, CalculationOptionsMeasurementEnd}
