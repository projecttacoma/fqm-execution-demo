import React, { useContext } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { InputRowContext } from '../../contexts/inputRowContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
);

export function MeasureDropdown() {
  const classes = useStyles();
  const { measureFileName, onMeasureDropdownChange, measureOptions } = useContext(InputRowContext);
  return (
    <div style={{ width: '100%' }}>
      <FormControl className={classes.root}>
        <Select value={measureFileName || ''} onChange={onMeasureDropdownChange}>
          {measureOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
export function PatientDropdown() {
  const classes = useStyles();
  const { patientFileName, onPatientDropdownChange, patientOptions } = useContext(InputRowContext);
  return (
    <div style={{ width: '100%' }}>
      <FormControl className={classes.root}>
        <Select value={patientFileName || ''} onChange={onPatientDropdownChange}>
          {patientOptions.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
