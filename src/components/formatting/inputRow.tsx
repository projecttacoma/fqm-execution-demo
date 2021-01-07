import React from 'react';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../fileUpload/FileUpload';
import DropDown from '../fileImport/fileImport';

interface Props {
  onMeasureUpload: (files: any) => void;
  onPatientUpload: (files: any) => void;
  measureFileName: string | null;
  patientFileName: string | null;
  onMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  measureOptions: string[];
  patientOptions: string[];
}

export default function InputRow(props: Props) {
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle: </h2>
        {props.patientFileName !== null && <h3>Current Measure Bundle:</h3>}
        <h3 style={{ color: '#3f51b5' }}> {props.measureFileName}</h3>
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
        <h3 style={{ color: '#3f51b5' }}> {props.patientFileName}</h3>
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
