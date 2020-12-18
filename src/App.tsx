import React, { useCallback, useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import OptionsRow from './components/formatting/optionsRow';
import InputRow from './components/formatting/inputRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex-grow',
      flexDirection: 'column',
      alignItems: 'center',

      '& > *': {
        margin: theme.spacing(1)
      }
    },
    formControl: {
      margin: theme.spacing(1)
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    container: {
      display: 'flex-grow'
    }
  })
);

export default function App() {
  const classes = useStyles();

  const [measureFileName, setMeasureFileName] = useState<string | null>(null);
  const [patientFileName, setPatientFileName] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const [measureBundle, setMeasureBundle] = useState<any>(null);
  const [patientBundle, setPatientBundle] = useState<any>(null);

  const onMeasureUpload = useCallback(files => {
    const measureBundleFile = files[0];
    setMeasureFileName(measureBundleFile);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setMeasureBundle(JSON.parse(reader.result as string));
      console.log(JSON.parse(reader.result as string));
    };

    reader.readAsText(measureBundleFile);
  }, []);

  const onPatientUpload = useCallback(files => {
    const patientBundleFile = files[0];
    setPatientFileName(patientBundleFile);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPatientBundle(JSON.parse(reader.result as string));
      console.log(JSON.parse(reader.result as string));
    };
    reader.readAsText(patientBundleFile);
  }, []);

  const [outputType, setOutputType] = useState<string>('raw');
  const [measurementPeriodStart, setMeasurementPeriodStart] = useState<Date | null>(null);
  const [measurementPeriodEnd, setMeasurementPeriodEnd] = useState<Date | null>(null);
  const [calculationOptions, setCalculationOptions] = useState<any>({
    calculateHTML: false,
    calculateSDEs: false,
    includeCaluseResults: false,
    includeHighlighting: false,
    includePrettyResults: false
  });

  return (
    <div className={classes.root}>
      <Grid>
        <h1 id="header">FQM Execution Demo</h1>
        <Grid container justify="space-evenly">
          <Grid container item xs={11} spacing={2} alignItems="center">
            <InputRow onMeasureUpload={onMeasureUpload} onPatientUpload={onPatientUpload} />
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-evenly">
          <Grid container item xs={11} spacing={2}>
            <OptionsRow
              setOutputType={setOutputType}
              outputType={outputType}
              setMeasurementPeriodStart={setMeasurementPeriodStart}
              measurementPeriodStart={measurementPeriodStart}
              setMeasurementPeriodEnd={setMeasurementPeriodEnd}
              measurementPeriodEnd={measurementPeriodEnd}
              setCalculationOptions={setCalculationOptions}
              calculationOptions={calculationOptions}
            />
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log({ 'type': outputType,
                'Measurement Period Start': measurementPeriodStart,
                'Measurement Period End': measurementPeriodEnd,
                'Calculation Options': calculationOptions});
            }}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
