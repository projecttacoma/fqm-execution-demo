import React, { useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { OptionsRow, DataImportRow } from './components/Layout';
import Button from '@material-ui/core/Button';
import { Calculator, CalculatorTypes } from 'fqm-execution';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  calculationOptionsState,
  measureFileState,
  measurementPeriodState,
  outputTypeState,
  patientFileState
} from './state';
import Results from './components/Results';

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
    },
    buttons: {
      margin: '4px'
    }
  })
);

export interface HTML {
  groupId: string;
  html: string;
}

export default function App() {
  const classes = useStyles();

  const [results, setResults] = useState<any>(null);
  const [htmls, setHTMLs] = useState<HTML[]>([]);

  const [measureFile, setMeasureFile] = useRecoilState(measureFileState);
  const [patientFile, setPatientFile] = useRecoilState(patientFileState);
  const [calculationOptions, setCalculationOptions] = useRecoilState(calculationOptionsState);
  const outputType = useRecoilValue(outputTypeState);
  const measurementPeriod = useRecoilValue(measurementPeriodState);

  const calculate = async () => {
    const options: CalculatorTypes.CalculationOptions = {
      ...calculationOptions,
      measurementPeriodStart: measurementPeriod.measurementPeriodStart?.toISOString(),
      measurementPeriodEnd: measurementPeriod.measurementPeriodEnd?.toISOString()
    };

    // Clear existing results before new calculation
    setResults(null);
    setHTMLs([]);

    if (outputType === 'rawResults') {
      if (measureFile.content && patientFile.content) {
        const { results } = await Calculator.calculateRaw(measureFile.content, [patientFile.content], options);
        setResults(results);
      }
    } else if (outputType === 'detailedResults') {
      if (measureFile.content && patientFile.content) {
        const { results } = await Calculator.calculate(measureFile.content, [patientFile.content], options);
        setResults(results);
        let html: HTML[] = [];
        if (results !== null && calculationOptions.calculateHTML === true) {
          results[0].detailedResults?.forEach(dr => {
            html.push({
              groupId: dr.groupId,
              html: dr.html || ''
            });
          });
          setHTMLs(html);
        }
      }
    } else if (outputType === 'measureReports') {
      if (measureFile.content && patientFile.content) {
        const mrResults = await Calculator.calculateMeasureReports(measureFile.content, [patientFile.content], options);
        const mrs = mrResults.results;

        if (calculationOptions.calculateHTML) {
          const htmls: HTML[] = (Array.isArray(mrs) ? mrs : [mrs]).map(m => ({
            groupId: m.id || '',
            html: m.text?.div || ''
          }));
          setHTMLs(htmls);
        }

        setResults(mrs);
      }
    } else if (outputType === 'gapsInCare') {
      if (measureFile.content && patientFile.content) {
        const { results } = await Calculator.calculateGapsInCare(measureFile.content, [patientFile.content], options);

        if (calculationOptions.calculateHTML) {
          const measureReportEntry = results.entry?.find(e => e.resource?.resourceType === 'MeasureReport');

          if (measureReportEntry?.resource) {
            const measureReport = measureReportEntry.resource as R4.IMeasureReport;
            setHTMLs([
              {
                groupId: measureReport.id || '',
                html: measureReport.text?.div || ''
              }
            ]);
          }
        }

        setResults(results);
      }
    }
  };

  const reset = () => {
    setMeasureFile({
      name: null,
      content: null
    });
    setPatientFile({
      name: null,
      content: null
    });
    setCalculationOptions({
      calculateHTML: false,
      calculateSDEs: false
    });
    setResults(null);
    setHTMLs([]);
  };

  return (
    <div className={classes.root}>
      <Grid>
        <h1 id="header">FQM Execution Demo</h1>
        <Grid container justify="space-evenly">
          <Grid container item xs={11} spacing={2}>
            <DataImportRow />
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-evenly">
          <Grid container item xs={11} spacing={2}>
            <OptionsRow />
          </Grid>
        </Grid>
        <Grid container justify="center" direction="row">
          <Button variant="contained" onClick={reset} className={classes.buttons}>
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={calculate}
            className={classes.buttons}
            disabled={measureFile.content === null || patientFile.content === null}
          >
            Calculate
          </Button>
        </Grid>
        <Results results={results} measureFile={measureFile} htmls={htmls} />
      </Grid>
    </div>
  );
}
