import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

let CalculationOptionsType: { type: string };
CalculationOptionsType = { type: 'raw' };

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('raw');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    CalculationOptionsType = { type: event.target.value };
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name="type" value={value} onChange={handleChange}>
        <FormControlLabel control={<Radio color="primary" />} value="raw" label="Raw" />
        <FormControlLabel control={<Radio color="primary" />} value="detailed" label="Detailed" />
        <FormControlLabel control={<Radio color="primary" />} value="results" label="Results" />
      </RadioGroup>
    </FormControl>
  );
}

export { RadioButtonsGroup, CalculationOptionsType };
