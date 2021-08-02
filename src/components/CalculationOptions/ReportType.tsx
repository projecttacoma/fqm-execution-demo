import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calculationOptionsState, outputTypeState } from '../../state';

function ReportTypeButtons() {
  const outputType = useRecoilValue(outputTypeState);
  const [calculationOptions, setCalculationOptions] = useRecoilState(calculationOptionsState);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setCalculationOptions({
      ...calculationOptions,
      reportType: value as 'subject-list' | 'summary' | 'individual' | undefined
    });
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup name="type" value={calculationOptions.reportType} onChange={handleChange}>
        <FormControlLabel
          control={<Radio color="primary" />}
          value="individual"
          checked={outputType === 'measureReports' && (calculationOptions.reportType === 'individual' ?? false)}
          label="Individual"
          disabled={outputType !== 'measureReports'}
        />
        <FormControlLabel
          control={<Radio color="primary" />}
          value="summary"
          checked={outputType === 'measureReports' && (calculationOptions.reportType === 'summary' ?? false)}
          label="Summary"
          disabled={outputType !== 'measureReports'}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default ReportTypeButtons;
