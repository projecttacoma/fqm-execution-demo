import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { MeasureFileUpload, PatientFileUpload } from '../fileSelection/fileUpload';
import {
  MeasureDropdown,
  ECQMMeasureDropdown,
  PatientDropdown,
  ECQMPatientDropdown,
  FHIRPatientDropdown
} from '../fileSelection/fileImport';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { InputRowContext } from '../../contexts/inputRowContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#3f51b5'
    }
  })
);
export default function InputRow() {
  const classes = useStyles();
  const {
    measureFileName,
    patientFileName,
    setPatientFileName,
    setMeasureFileName,
    setPatientOptions,
    setECQMPatientOptions
  } = useContext(InputRowContext);
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle: </h2>
        {measureFileName !== null && <h3>Current Measure Bundle:</h3>}
        {measureFileName !== null && (
          <Grid container>
            <h3 className={classes.root}> {measureFileName}</h3>{' '}
            {measureFileName !== null && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setMeasureFileName(null);
                  setPatientOptions([]);
                  setECQMPatientOptions([]);
                  setPatientFileName(null);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        )}
        <h4>Upload From File System:</h4>
        <MeasureFileUpload />
        <h4>OR Select From Connectathon Repository:</h4>
        <MeasureDropdown />
        <h4>OR Select From eCQM Measure Content Repository:</h4>
        <ECQMMeasureDropdown />
      </Grid>
      <Grid item xs={6}>
        <h2>Patient Bundle: </h2>
        {patientFileName !== null && <h3>Current Patient Bundle:</h3>}
        {patientFileName !== null && (
          <Grid container>
            <h3 className={classes.root}> {patientFileName}</h3>{' '}
            {patientFileName !== null && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setPatientFileName(null);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        )}
        <h4>Upload From File System:</h4>
        <PatientFileUpload />
        <h4>OR Select From Connectathon Repository:</h4>
        <PatientDropdown />
        <h4>OR Select From FHIR Patient Generator Repository:</h4>
        <FHIRPatientDropdown />
        <h4>OR Select From eCQM Measure Content Repository:</h4>
        <ECQMPatientDropdown />
      </Grid>
    </React.Fragment>
  );
}
