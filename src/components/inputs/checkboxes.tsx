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
            checked={OptionsRowInfo.calculationOptions.includeClauseResults}
            onChange={handleChange}
            name="includeClauseResults"
            color="primary"
          />
        }
        label="Include Clause Results"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.calculationOptions.includePrettyResults}
            onChange={handleChange}
            name="includePrettyResults"
            color="primary"
          />
        }
        label="Include Pretty Results"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.calculationOptions.includeHighlighting}
            onChange={handleChange}
            name="includeHighlighting"
            color="primary"
          />
        }
        label="Include Highlighting"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.calculationOptions.calculateSDEs}
            onChange={handleChange}
            name="calculateSDEs"
            color="primary"
          />
        }
        label="Calculate SDEs"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={OptionsRowInfo.calculationOptions.calculateHTML}
            onChange={handleChange}
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
