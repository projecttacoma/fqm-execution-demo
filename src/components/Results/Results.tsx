import { makeStyles, Grid, IconButton, AppBar, Tab, Tabs } from '@material-ui/core';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import ReactJson from 'react-json-view';
import parse from 'html-react-parser';
import fileDownload from 'js-file-download';
import React from 'react';
import { FileUploadState } from '../../state';
import { GetApp } from '@material-ui/icons';
import { HTML } from '../../App';
import { PopulationResults, DetectedIssueResources } from '../Results';
import { useRecoilValue } from 'recoil';
import { calculationOptionsState, outputTypeState, resultsState } from '../../state';
import { R4 } from '@ahryman40k/ts-fhir-types';
import fhirpath from 'fhirpath';

const useStyles = makeStyles(() => ({
  highlightedMarkup: {
    '& pre': {
      whiteSpace: 'pre-wrap'
    }
  }
}));

interface Props {
  measureFile: FileUploadState;
  patientFile: FileUploadState;
  htmls: HTML[];
}

const Results: React.FC<Props> = ({ measureFile, patientFile, htmls }) => {
  const classes = useStyles();
  const outputType = useRecoilValue(outputTypeState);
  const calculationOptions = useRecoilValue(calculationOptionsState);
  const results = useRecoilValue(resultsState);
  const detectedIssues = fhirpath.evaluate(results, 'Bundle.entry.resource.DetectedIssue');

  const style = {
    minWidth: '25%'
  };

  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  const displayJSONResults = () => {
    return (
      <>
        <Grid container item xs direction="row">
          {results && <h2>JSON:</h2>}
          {results && (
            <IconButton
              onClick={() => {
                fileDownload(
                  JSON.stringify(results, null, 2),
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
        {patientFile && <h2>Patient Bundle:</h2>}
        {patientFile && (
          <ReactJson src={patientFile} enableClipboard={true} theme="shapeshifter:inverted" collapsed={2} />
        )}
      </>
    );
  };

  const displayHTMLResults = () => {
    return (
      <Grid item xs>
        {results &&
          htmls &&
          htmls.map(html => {
            return (
              <div key={html.groupId} className={classes.highlightedMarkup}>
                <h2>HTML:</h2>
                {parse(html.html)}
              </div>
            );
          })}
      </Grid>
    );
  };

  const displayTabularResults = () => {
    return (
      <Grid container item xs={12} direction="row" justify="center" alignItems="center">
        {fhirpath.evaluate(results, 'MeasureReport.group').map((group: R4.IMeasureReport_Group) => {
          const id = results ? fhirpath.evaluate(results, 'MeasureReport.subject.reference')[0].split('/') : '';
          return (
            <Grid container item xs={12} direction="column" justify="center" alignItems="center" key={group.id}>
              <h2>{group.id} Population Results</h2>
              <PopulationResults key={group.id} results={group} id={id} />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const displayAccordionResults = () => {
    return (
      <>
        {results &&
          detectedIssues.map((issue: R4.IDetectedIssue, index: number) => {
            const detectedIssueId = fhirpath.evaluate(issue, 'id');
            return (
              <Grid
                container
                item
                xs={12}
                direction="column"
                justify="center"
                alignItems="center"
                key={detectedIssueId}
              >
                <h3>Detected Issue {index + 1}</h3>
                <h4>{fhirpath.evaluate(issue, 'contained.GuidanceResponse').length} Guidance Response(s)</h4>
                <DetectedIssueResources detectedIssue={issue} />
              </Grid>
            );
          })}
      </>
    );
  };

  const shouldDisplayHTML = () => {
    return htmls.length > 0;
  };

  const shouldDisplayAccordion = () => {
    return outputType === 'gapsInCare';
  };

  const shouldDisplayTabular = () => {
    return outputType === 'measureReports' && calculationOptions.reportType === 'individual';
  };

  const shouldDisplayTabs = () => {
    return shouldDisplayHTML() || shouldDisplayAccordion() || shouldDisplayTabular();
  };

  return (
    <Grid container xs={12} direction="column" spacing={2}>
      <h2>Results:</h2>{' '}
      {shouldDisplayTabs() ? (
        <TabContext value={value}>
          <AppBar position="static">
            <Tabs
              TabIndicatorProps={{ style: { background: 'white' } }}
              aria-label="results tabs"
              onChange={handleChange}
              value={value}
              indicatorColor="primary"
              centered
            >
              <Tab style={style} label="Raw JSON" value="0" />
              {shouldDisplayHTML() && <Tab style={style} label="Highlighted HTML" value="1" />}
              {shouldDisplayTabular() && <Tab style={style} label="Tabular" value="2" />}
              {shouldDisplayAccordion() && <Tab style={style} label="Accordion" value="3" />}
            </Tabs>
          </AppBar>

          <TabPanel value="0">{displayJSONResults()}</TabPanel>
          {shouldDisplayHTML() && <TabPanel value="1">{displayHTMLResults()}</TabPanel>}
          {shouldDisplayTabular() && <TabPanel value="2">{displayTabularResults()}</TabPanel>}
          {shouldDisplayAccordion() && <TabPanel value="3">{displayAccordionResults()}</TabPanel>}
        </TabContext>
      ) : (
        displayJSONResults()
      )}
    </Grid>
  );
};

export default Results;
