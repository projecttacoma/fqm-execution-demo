import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

let CalculationOptionsCheckboxes = {};

function CheckboxesGroup() {
  const [state, setState] = React.useState({
    includeClauseResults: false,
    includePrettyResults: false,
    includeHighlighting: false,
    calculateSDEs: false,
    calculateHTML: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  CalculationOptionsCheckboxes = state;

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={state.includeClauseResults}
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
            checked={state.includePrettyResults}
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
            checked={state.includeHighlighting}
            onChange={handleChange}
            name="includeHighlighting"
            color="primary"
          />
        }
        label="Include Highlighting"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.calculateSDEs} onChange={handleChange} name="calculateSDEs" color="primary" />
        }
        label="Calculate SDEs"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.calculateHTML} onChange={handleChange} name="calculateHTML" color="primary" />
        }
        label="Calculate HTML"
      />
    </FormGroup>
  );
}

export { CheckboxesGroup, CalculationOptionsCheckboxes };
