import React from 'react';
import Button from '@material-ui/core/Button';
import {CalculationOptionsType} from './radioButtons';
import {CalculationOptionsCheckboxes} from './checkboxes';
import {CalculationOptionsMeasurementStart, CalculationOptionsMeasurementEnd} from './datePicker';

let  CalculationOptions:{type:string; options: object; measurementPeriodStart: string; measurementPeriodEnd: string;};

export default function ContainedButtons() {
  return (
      <Button variant="contained" color = "primary" onClick={()=>{
          CalculationOptions={type:CalculationOptionsType.type, options:CalculationOptionsCheckboxes, measurementPeriodStart: CalculationOptionsMeasurementStart, measurementPeriodEnd: CalculationOptionsMeasurementEnd};
          console.log(CalculationOptions)
      }}>
        Calculate
      </Button>
  );
}