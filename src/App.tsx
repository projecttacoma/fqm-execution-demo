import React, { useCallback, useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import OptionsRow from './components/formatting/optionsRow';
import InputRow from './components/formatting/inputRow';
import Button from '@material-ui/core/Button';
import { Calculator, CalculatorTypes } from 'fqm-execution';

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

  const [measureBundle, setMeasureBundle] = useState<any>(null);
  const [patientBundle, setPatientBundle] = useState<any>(null);

  const onMeasureUpload = useCallback(files => {
    const measureBundleFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMeasureFileName(measureBundleFile.path);
      setMeasureBundle(JSON.parse(reader.result as string));
    };

    reader.readAsText(measureBundleFile);
  }, []);

  const onPatientUpload = useCallback(files => {
    const patientBundleFile = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setPatientFileName(patientBundleFile.path);
      setPatientBundle(JSON.parse(reader.result as string));
    };

    reader.readAsText(patientBundleFile);
  }, []);

  const [outputType, setOutputType] = useState<string>('raw');
  const [measurementPeriodStart, setMeasurementPeriodStart] = useState<Date | null>(new Date('1/1/2019'));
  const [measurementPeriodEnd, setMeasurementPeriodEnd] = useState<Date | null>(new Date('12/31/2019'));
  const [calculationOptions, setCalculationOptions] = useState<CalculatorTypes.CalculationOptions>({
    calculateHTML: false,
    calculateSDEs: false,
    includeClauseResults: false,
    includeHighlighting: false,
    includePrettyResults: false
  });
  const options = {
    measurementPeriodStart: measurementPeriodStart?.toISOString(),
    measurementPeriodEnd: measurementPeriodEnd?.toISOString(),
    ...calculationOptions
  };

  return (
    <div className={classes.root}>
      <Grid>
        <h1 id="header">FQM Execution Demo</h1>
        <Grid container justify="space-evenly">
          <Grid container item xs={11} spacing={2} alignItems="center">
            <InputRow
              onMeasureUpload={onMeasureUpload}
              onPatientUpload={onPatientUpload}
              measureFileName={measureFileName}
              patientFileName={patientFileName}
            />
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
            onClick={() => {
              setMeasureFileName(null);
              setPatientFileName(null);
              setMeasureBundle(null);
              setPatientBundle(null);
              setMeasurementPeriodStart(new Date('1/1/2019'));
              setMeasurementPeriodEnd(new Date('12/31/2019'));
              setCalculationOptions({
                calculateHTML: false,
                calculateSDEs: false,
                includeClauseResults: false,
                includeHighlighting: false,
                includePrettyResults: false
              });
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              let results = {};
              if (outputType === 'rawResults') {
                results = Calculator.calculateRaw(measureBundle, [patientBundle], options);
              } else if (outputType === 'detailedResults') {
                results = Calculator.calculate(measureBundle, [patientBundle], options);
              } else if (outputType === 'measureReports') {
                results = Calculator.calculateMeasureReports(measureBundle, [patientBundle], options);
              }
              console.log(results);
            }}
          >
            Calculate
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
