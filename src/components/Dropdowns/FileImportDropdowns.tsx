import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  measureDropdownOptionsState,
  measureFileState,
  patientDropdownOptionsState,
  patientFileState,
  resultsState,
  outputTypeState
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
  const setResults = useSetRecoilState(resultsState);

  const onMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setResults(null);
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
          content: data as fhir4.Bundle,
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
  const setResults = useSetRecoilState(resultsState);
  const outputType = useRecoilValue(outputTypeState);

  const onPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setResults(null);
    const name = event.target.value as string;
    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/${measureFile.name}/${measureFile.name}-files/${name}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientFile({
          name,
          content: data as fhir4.Bundle,
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
          disabled={
            (patientFile.content !== null && patientFile.fromFileUpload === true) || outputType === 'dataRequirement'
          }
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
