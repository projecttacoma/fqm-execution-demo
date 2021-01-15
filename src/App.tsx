import React, { useCallback, useState, useEffect } from 'react';
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
import fileDownload from 'js-file-download';

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

  const [measureOptions, setMeasureOptions] = useState<string[]>([]);
  const [ecqmMeasureOptions, setECQMMeasureOptions] = useState<string[]>([]);
  const [patientOptions, setPatientOptions] = useState<string[]>([]);
  const [ecqmPatientOptions, setECQMPatientOptions] = useState<string[]>([]);
  const [showDropdowns, setShowDropdowns] = useState<boolean>(true);

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

  const onECQMMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let name = event.target.value as string;
    fetch(
      `https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/` +
        name +
        `/` +
        name +
        `-bundle.json`
    )
      .then(response => response.json())
      .then(data => {
        setMeasureFileName(name);
        setMeasureBundle(data);
        return fetch(
          `https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure/${name}/${name}-files`
        );
      })
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        const filteredNames = names.filter((name: string) => {
          return name.startsWith('tests');
        });
        setECQMPatientOptions(filteredNames);
      })
      .catch(error => console.log('error: ', error));
  };

  const onMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let name = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/` +
        name +
        `/` +
        name +
        `-bundle.json`
    )
      .then(response => response.json())
      .then(data => {
        setMeasureFileName(name);
        setMeasureBundle(data);
        return fetch(
          `https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure/${name}/${name}-files`
        );
      })
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        const filteredNames = names.filter((name: string) => {
          return name.startsWith('tests');
        });
        setPatientOptions(filteredNames);
        setECQMPatientOptions([]);
      })
      .catch(error => console.log('error: ', error));
  };

  const onPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const patientName = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/${measureFileName}/${measureFileName}-files/${patientName}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientBundle(data);
        setPatientFileName(patientName);
      });
  };

  const onECQMPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const patientName = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/${measureFileName}/${measureFileName}-files/${patientName}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientBundle(data);
        setPatientFileName(patientName);
      });
  };

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

  useEffect(() => {
    fetch(`https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure`)
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        setMeasureOptions(names);
        return fetch(`https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure`);
      })
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        setECQMMeasureOptions(names);
      })
      .catch(e => {
        console.error('Error fetching from GitHub', e);
        setShowDropdowns(false);
      });
  }, []);

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
              setMeasureFileName={setMeasureFileName}
              patientFileName={patientFileName}
              setPatientFileName={setPatientFileName}
              onMeasureDropdownChange={onMeasureDropdownChange}
              onECQMMeasureDropdownChange={onECQMMeasureDropdownChange}
              onPatientDropdownChange={onPatientDropdownChange}
              onECQMPatientDropdownChange={onECQMPatientDropdownChange}
              measureOptions={measureOptions}
              ecqmMeasureOptions={ecqmMeasureOptions}
              patientOptions={patientOptions}
              ecqmPatientOptions={ecqmPatientOptions}
              setPatientOptions={setPatientOptions}
              setECQMPatientOptions={setECQMPatientOptions}
              showDropdowns={showDropdowns}
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
                const mrResults = Calculator.calculateMeasureReports(measureBundle, [patientBundle], options);
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
                setResults(Calculator.calculateGapsInCare(measureBundle, [patientBundle], options));
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
