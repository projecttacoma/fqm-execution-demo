import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useRecoilState } from 'recoil';
import { outputTypeState } from '../../state';

function OutputTypeButtons() {
  const [outputType, setOutputType] = useRecoilState(outputTypeState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setOutputType(value);
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

export default OutputTypeButtons;
