import React from 'react';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../fileUpload/FileUpload';
import DropDown from '../fileImport/fileImport';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface Props {
  onMeasureUpload: (files: any) => void;
  onPatientUpload: (files: any) => void;
  measureFileName: string | null;
  setMeasureFileName: (files: any) => void;
  patientFileName: string | null;
  setPatientFileName: (files: any) => void;
  onMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  measureOptions: string[];
  patientOptions: string[];
  setPatientOptions: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#3f51b5'
    }
  })
);
export default function InputRow(props: Props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle: </h2>
        {props.measureFileName !== null && <h3>Current Measure Bundle:</h3>}
        {props.measureFileName !== null && (
          <Grid container>
            <h3 className={classes.root}> {props.measureFileName}</h3>{' '}
            {props.measureFileName !== null && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  props.setMeasureFileName(null);
                  props.setPatientOptions([]);
                  props.setPatientFileName(null);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        )}
        <h4>Upload From File System:</h4>
        <FileUpload onDrop={props.onMeasureUpload} /> <h4>OR Select From Connectathon Repository:</h4>
        <DropDown
          selectedValue={props.measureFileName || ''}
          options={props.measureOptions}
          handleChange={props.onMeasureDropdownChange}
        />
      </Grid>
      <Grid item xs={6}>
        <h2>Patient Bundle: </h2>
        {props.patientFileName !== null && <h3>Current Patient Bundle:</h3>}
        {props.patientFileName !== null && (
          <Grid container>
            <h3 className={classes.root}> {props.patientFileName}</h3>{' '}
            {props.patientFileName !== null && (
              <IconButton
                aria-label="delete"
                onClick={() => {
                  props.setPatientFileName(null);
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Grid>
        )}
        <h4>Upload From File System:</h4>
        <FileUpload onDrop={props.onPatientUpload} /> <h4>OR Select From Connectathon Repository:</h4>
        <DropDown
          selectedValue={props.patientFileName || ''}
          options={props.patientOptions}
          handleChange={props.onPatientDropdownChange}
        />
      </Grid>
    </React.Fragment>
  );
}
