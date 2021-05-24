import React, { Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import { MeasureFileUpload, PatientFileUpload } from '../FileUpload';
import { MeasureDropdown, PatientDropdown } from '../Dropdowns';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { measureFileState, patientFileState } from '../../state';
import { Loading } from '../Utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#3f51b5'
    }
  })
);

export default function DataImportRow() {
  const classes = useStyles();

  const [measureFile, setMeasureFile] = useRecoilState(measureFileState);
  const [patientFile, setPatientFile] = useRecoilState(patientFileState);

  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle: </h2>
        <Grid container>
          {measureFile.name !== null ? (
            <>
              <h3 className={classes.root}> {measureFile.name}</h3>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setMeasureFile({
                    name: null,
                    content: null
                  });
                  setPatientFile({
                    name: null,
                    content: null
                  });
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <h3 className={classes.root}>None Selected</h3>
          )}
        </Grid>
        <h4>Upload From File System:</h4>
        <MeasureFileUpload />
        <h4>OR Select From Connectathon Repository:</h4>
        <Suspense fallback={<Loading />}>
          <MeasureDropdown />
        </Suspense>
      </Grid>
      <Grid item xs={6}>
        <h2>Patient Bundle: </h2>
        <Grid container>
          {patientFile.name !== null ? (
            <>
              <h3 className={classes.root}>{patientFile.name}</h3>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setPatientFile({
                    name: null,
                    content: null
                  });
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <h3 className={classes.root}>None Selected</h3>
          )}
        </Grid>
        <h4>Upload From File System:</h4>
        <PatientFileUpload />
        <h4>OR Select From Connectathon Repository:</h4>
        <Suspense fallback={<Loading />}>
          <PatientDropdown />
        </Suspense>
      </Grid>
    </React.Fragment>
  );
}
