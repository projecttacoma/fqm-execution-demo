import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRecoilState, useRecoilValue } from 'recoil';
import { R4 } from '@ahryman40k/ts-fhir-types';
import {
  measureDropdownOptionsState,
  measureFileState,
  patientDropdownOptionsState,
  patientFileState
} from '../../state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
);

export function MeasureDropdown() {
  const classes = useStyles();
  const measureOptions = useRecoilValue(measureDropdownOptionsState);
  const [measureFile, setMeasureFile] = useRecoilState(measureFileState);

  const onMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const name = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/` +
        name +
        `/` +
        name +
        `-bundle.json`
    )
      .then(response => response.json())
      .then(data => {
        setMeasureFile({
          name,
          content: data as R4.IBundle,
          fromFileUpload: false
        });
      })
      .catch(error => console.log('error: ', error));
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl className={classes.root}>
        <Select
          value={measureFile.name || ''}
          onChange={onMeasureDropdownChange}
          disabled={measureFile.content !== null && measureFile.fromFileUpload === true}
        >
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

  const [patientFile, setPatientFile] = useRecoilState(patientFileState);
  const measureFile = useRecoilValue(measureFileState);
  const patientOptions = useRecoilValue(patientDropdownOptionsState);

  const onPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const name = event.target.value as string;
    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/${measureFile.name}/${measureFile.name}-files/${name}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientFile({
          name,
          content: data as R4.IBundle,
          fromFileUpload: false
        });
      })
      .catch(error => console.log('error: ', error));
  };

  return (
    <div style={{ width: '100%' }}>
      <FormControl className={classes.root}>
        <Select
          value={patientFile.name || ''}
          onChange={onPatientDropdownChange}
          disabled={patientFile.content !== null && patientFile.fromFileUpload === true}
        >
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
