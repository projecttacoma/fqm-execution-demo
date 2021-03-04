import React, { useContext } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { OptionsRowContext } from '../../contexts/optionsRowContext';

function CheckboxesGroup() {
  const OptionsRowInfo = useContext(OptionsRowContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    OptionsRowInfo.setCalculationOptions({
      ...OptionsRowInfo.calculationOptions,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.outputType !== 'rawResults' && OptionsRowInfo.calculationOptions.calculateSDEs}
            onChange={handleChange}
            disabled={OptionsRowInfo.outputType === 'rawResults'}
            name="calculateSDEs"
            color="primary"
          />
        }
        label="Calculate SDEs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.outputType !== 'rawResults' && OptionsRowInfo.calculationOptions.calculateHTML}
            onChange={handleChange}
            disabled={OptionsRowInfo.outputType === 'rawResults'}
            name="calculateHTML"
            color="primary"
          />
        }
        label="Calculate HTML"
      />
    </FormGroup>
  );
}

export { CheckboxesGroup };
