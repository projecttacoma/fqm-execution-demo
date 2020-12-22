import React, { Dispatch, SetStateAction } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

interface Props {
  setOutputType: Dispatch<SetStateAction<string>>;
  outputType: string;
}

export default function RadioButtonsGroup(props: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setOutputType((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name="type" value={props.outputType} onChange={handleChange}>
        <FormControlLabel control={<Radio color="primary" />} value="rawResults" label="Raw" />
        <FormControlLabel control={<Radio color="primary" />} value="detailedResults" label="Detailed" />
        <FormControlLabel control={<Radio color="primary" />} value="measureReports" label="Measure Reports" />
      </RadioGroup>
    </FormControl>
  );
}

export { RadioButtonsGroup };
