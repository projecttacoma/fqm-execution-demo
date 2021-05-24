import React, { useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { OptionsRow, DataImportRow } from './components/Layout';
import Button from '@material-ui/core/Button';
import { Calculator, CalculatorTypes } from 'fqm-execution';
import ReactJson from 'react-json-view';
import parse from 'html-react-parser';
import fileDownload from 'js-file-download';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  calculationOptionsState,
  measureFileState,
  measurementPeriodState,
  outputTypeState,
  patientFileState
} from './state';
import { IconButton } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

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
    highlightedMarkup: {
      '& pre': {
        whiteSpace: 'pre-wrap'
      }
    },
    buttons: {
      margin: '4px'
    }
  })
);

interface HTML {
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

    if (outputType === 'rawResults') {
      if (measureFile.content && patientFile.content) {
        // Clear existing HTML markup if exists
        setHTMLs([]);
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
        } else {
          setHTMLs([]);
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
        } else {
          // Clear existing HTML markup if exists
          setHTMLs([]);
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
        } else {
          // Clear existing HTML markup if exists
          setHTMLs([]);
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
        <Grid container>
          <Grid container item xs={6} direction="column">
            <Grid container direction="row">
              <h2>Results:</h2>
              {results && (
                <IconButton
                  onClick={() => {
                    fileDownload(
                      JSON.stringify(results),
                      measureFile.name?.includes('.json')
                        ? `results-${measureFile.name}`
                        : `results-${measureFile.name}.json`
                    );
                  }}
                >
                  <GetApp fontSize="small" />
                </IconButton>
              )}
            </Grid>
            {results && <ReactJson src={results} enableClipboard={true} theme="shapeshifter:inverted" collapsed={2} />}
          </Grid>
          <Grid container item xs={6}>
            {htmls &&
              htmls.map(html => {
                return (
                  <div key={html.groupId} className={classes.highlightedMarkup}>
                    <h2>HTML:</h2>
                    {parse(html.html)}
                  </div>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
