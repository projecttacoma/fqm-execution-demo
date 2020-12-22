import React, { Dispatch, SetStateAction } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { CalculatorTypes } from 'fqm-execution';

interface Props {
  setCalculationOptions: Dispatch<SetStateAction<CalculatorTypes.CalculationOptions>>;
  calculationOptions: CalculatorTypes.CalculationOptions;
}

function CheckboxesGroup(props: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setCalculationOptions({ ...props.calculationOptions, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.calculationOptions.includeClauseResults}
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
            checked={props.calculationOptions.includePrettyResults}
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
            checked={props.calculationOptions.includeHighlighting}
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
            checked={props.calculationOptions.calculateSDEs}
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
            checked={props.calculationOptions.calculateHTML}
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
