import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useRecoilState, useRecoilValue } from 'recoil';
import { calculationOptionsState, outputTypeState } from '../../state';

function CalculationOptionsButtons() {
  const outputType = useRecoilValue(outputTypeState);
  const [calculationOptions, setCalculationOptions] = useRecoilState(calculationOptionsState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalculationOptions({
      ...calculationOptions,
      [event.target.name]: event.target.checked
    });
  };

  const shouldCheckSDE = () => {
    return (
      outputType !== 'rawResults' &&
      outputType !== 'dataRequirement' &&
      calculationOptions.reportType === 'individual' &&
      calculationOptions.calculateSDEs
    );
  };

  const shouldDisableSDE = () => {
    return (
      outputType === 'rawResults' ||
      outputType === 'dataRequirement' ||
      (outputType === 'measureReports' && calculationOptions.reportType === 'summary')
    );
  };

  const shouldCheckHTML = () => {
    return (
      outputType !== 'rawResults' &&
      outputType !== 'dataRequirement' &&
      calculationOptions.reportType !== 'summary' &&
      calculationOptions.calculateHTML
    );
  };

  const shouldDisableHTML = () => {
    return (
      outputType === 'rawResults' ||
      outputType === 'dataRequirement' ||
      (outputType === 'measureReports' && calculationOptions.reportType === 'summary')
    );
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={shouldCheckSDE()}
            onChange={handleChange}
            disabled={shouldDisableSDE()}
            name="calculateSDEs"
            color="primary"
          />
        }
        label="Calculate SDEs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={shouldCheckHTML()}
            onChange={handleChange}
            disabled={shouldDisableHTML()}
            name="calculateHTML"
            color="primary"
          />
        }
        label="Calculate HTML"
      />
    </FormGroup>
  );
}

export default CalculationOptionsButtons;
