import React, { useCallback, useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import FileUpload from './components/fileUpload/FileUpload';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {CheckboxesGroup} from './components/inputs/checkboxes';
import {RadioButtonsGroup} from './components/inputs/radioButtons'
import Button from './components/inputs/calculateButtonateButton';
import {MeasurementStart, MeasurementEnd} from './components/inputs/datePicker'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex-grow',
      flexDirection: 'column',
      alignItems: 'center',
      
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    formControl: {
      margin: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    container: {
      display: 'flex-grow',
     
    },
    
  }),
);




function App() {
  const classes = useStyles();
  const [file, setFile] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<null>(null);

  const onMeasureUpload = useCallback(files => {
    const csv = files[0];
    setFile(csv);
    setLoading(true);
    const reader = new FileReader();
    reader.readAsText(csv);
  }, []);

  const onPatientUpload = useCallback(files => {
    const csv = files[0];
    setFile(csv);
    setLoading(true);
    const reader = new FileReader();
    reader.readAsText(csv);
  }, []);

  function InputRow(){
    return(
      <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle:</h2>
         {file === null && <FileUpload onDrop={onMeasureUpload} />}
    </Grid>
    <Grid item xs={6}>
    <h2>Patient Bundle:</h2>
         {file === null && <FileUpload onDrop={onPatientUpload} />}
    </Grid>
    </React.Fragment>
    )
  }
  function OptionsRow(){
    return(
      <React.Fragment>
          <Grid item xs={4}>
            <h3>Output Type:</h3>
            <RadioButtonsGroup />
            

          </Grid>
          <Grid item xs={4}>
          <h3 >Calculation Options:</h3>
            <CheckboxesGroup/>
          </Grid>
          <Grid item xs={4}>
            <h3>Measurement Start: </h3>
          <MeasurementStart/>
          <h3>Measurement End: </h3>
          <MeasurementEnd/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Button/>
          </Grid>
        </React.Fragment>
    );
  }
  
  return (
    <div className={classes.root}>

        
          <h1 id = 'header'>FQM Execution Demo</h1>
      
        
      <Grid container spacing={1} justify='space-evenly'>
        <Grid container item xs={11} spacing={3} alignItems = 'center'>
          <InputRow />
        </Grid>
      </Grid>
      <Grid container spacing={1} justify='space-evenly'>
        <Grid container item xs={11} spacing={3}>
          <OptionsRow />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
