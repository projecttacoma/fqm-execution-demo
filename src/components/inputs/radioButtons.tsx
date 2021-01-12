import React, { useContext } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { OptionsRowContext } from '../../contexts/optionsRowContext';

export default function RadioButtonsGroup() {
  const { outputType, setOutputType } = useContext(OptionsRowContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOutputType((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name="type" value={outputType} onChange={handleChange}>
        <FormControlLabel control={<Radio color="primary" />} value="rawResults" label="Raw" />
        <FormControlLabel control={<Radio color="primary" />} value="detailedResults" label="Detailed" />
        <FormControlLabel control={<Radio color="primary" />} value="measureReports" label="Measure Reports" />
        <FormControlLabel control={<Radio color="primary" />} value="gapsInCare" label="Gaps In Care" />
      </RadioGroup>
    </FormControl>
  );
}

export { RadioButtonsGroup };
