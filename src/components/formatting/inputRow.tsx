import React from 'react';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../fileUpload/FileUpload';

interface Props {
  onMeasureUpload: (files: any) => void;
  onPatientUpload: (files: any) => void;
}
export default function InputRow(props: Props) {
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle:</h2>
        {<FileUpload onDrop={props.onMeasureUpload} />}
      </Grid>
      <Grid item xs={6}>
        <h2>Patient Bundle:</h2>
        {<FileUpload onDrop={props.onPatientUpload} />}
      </Grid>
    </React.Fragment>
  );
}
