import React, { useState, useContext } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import OptionsRow from './components/formatting/optionsRow';
import InputRow from './components/formatting/inputRow';
import Button from '@material-ui/core/Button';
import { Calculator } from 'fqm-execution';
import ReactJson from 'react-json-view';
import parse from 'html-react-parser';
import fileDownload from 'js-file-download';
import { OptionsRowContext } from './contexts/optionsRowContext';
import { InputRowContext } from './contexts/inputRowContext';

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

  const {
    outputType,
    measurementPeriodStart,
    setMeasurementPeriodStart,
    measurementPeriodEnd,
    setMeasurementPeriodEnd,
    calculationOptions,
    setCalculationOptions
  } = useContext(OptionsRowContext);

  const {
    measureFileName,
    setPatientFileName,
    setMeasureFileName,
    measureBundle,
    patientBundle,
    setMeasureBundle,
    setPatientBundle
  } = useContext(InputRowContext);

  return (
    <div className={classes.root}>
      <Grid>
        <h1 id="header">FQM Execution Demo</h1>
        <Grid container justify="space-evenly">
          <Grid container item xs={11} spacing={2} alignItems="center">
            <InputRow />
          </Grid>
        </Grid>
        <Grid container spacing={1} justify="space-evenly">
          <Grid container item xs={11} spacing={2}>
            <OptionsRow />
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
              });
              setResults(null);
              setHTMLs([]);
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              const options = {
                measurementPeriodStart: measurementPeriodStart?.toISOString(),
                measurementPeriodEnd: measurementPeriodEnd?.toISOString(),
                ...calculationOptions
              };
              if (outputType === 'rawResults') {
                setResults(Calculator.calculateRaw(measureBundle, patientBundle, options));
              } else if (outputType === 'detailedResults') {
                let detailedResultsCalculation = Calculator.calculate(measureBundle, patientBundle, options);
                setResults(detailedResultsCalculation);
                let IDhtml = [];
                if (detailedResultsCalculation !== null && calculationOptions.calculateHTML === true) {
                  let i: any;
                  for (i in detailedResultsCalculation.results[0].detailedResults) {
                    if (detailedResultsCalculation.results[0].detailedResults !== undefined) {
                      IDhtml.push({
                        groupId: detailedResultsCalculation.results[0].detailedResults[i].groupId,
                        html: detailedResultsCalculation.results[0].detailedResults[i].html!
                      });
                    }
                  }
                  setHTMLs(IDhtml);
                } else {
                  setHTMLs([]);
                }
              } else if (outputType === 'measureReports') {
                const mrResults = Calculator.calculateMeasureReports(measureBundle, patientBundle, options);
                const mrs = mrResults.results;

                if (options.calculateHTML) {
                  const htmls: HTML[] = mrs.map(m => ({
                    groupId: m.id || '',
                    html: m.text?.div || ''
                  }));
                  setHTMLs(htmls);
                }

                setResults(mrResults);
              } else if (outputType === 'gapsInCare') {
                setResults(Calculator.calculateGapsInCare(measureBundle, patientBundle, options));
              }
            }}
          >
            Calculate
          </Button>
        </Grid>
        <Grid container>
          <Grid container item xs={6} direction="row">
            <div>
              <h2>Results:</h2>
              {results && (
                <ReactJson src={results} enableClipboard={true} theme="shapeshifter:inverted" collapsed={2} />
              )}
              {results && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    fileDownload(
                      JSON.stringify(results),
                      measureFileName?.includes('.json')
                        ? `results-${measureFileName}`
                        : `results-${measureFileName}.json`
                    );
                  }}
                >
                  Download
                </Button>
              )}
            </div>
          </Grid>
          <Grid container item xs={6} direction="row">
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
