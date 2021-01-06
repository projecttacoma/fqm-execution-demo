import React, { useCallback, useState } from 'react';
import 'date-fns';
import './index.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import OptionsRow from './components/formatting/optionsRow';
import InputRow from './components/formatting/inputRow';
import Button from '@material-ui/core/Button';
import { Calculator, CalculatorTypes } from 'fqm-execution';
import ReactJson from 'react-json-view';
import parse from 'html-react-parser';

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

  const [measureFileName, setMeasureFileName] = useState<string | null>(null);
  const [patientFileName, setPatientFileName] = useState<string | null>(null);

  const [results, setResults] = useState<any>(null);

  const [htmls, setHTMLs] = useState<HTML[]>([]);

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
                setResults(Calculator.calculateRaw(measureBundle, [patientBundle], options));
              } else if (outputType === 'detailedResults') {
                let detailedResultsCalculation = Calculator.calculate(measureBundle, [patientBundle], options);
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
                setResults(Calculator.calculateMeasureReports(measureBundle, [patientBundle], options));
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
