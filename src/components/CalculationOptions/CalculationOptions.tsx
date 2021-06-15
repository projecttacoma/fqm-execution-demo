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

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={outputType !== 'rawResults' && calculationOptions.calculateSDEs}
            onChange={handleChange}
            disabled={outputType === 'rawResults'}
            name="calculateSDEs"
            color="primary"
          />
        }
        label="Calculate SDEs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={outputType !== 'rawResults' && calculationOptions.calculateHTML}
            onChange={handleChange}
            disabled={outputType === 'rawResults'}
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

