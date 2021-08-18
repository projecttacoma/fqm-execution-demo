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
import fhirpath from 'fhirpath';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  highlightedMarkup: {
    '& pre': {
      whiteSpace: 'pre-wrap'
    }
  },
  buttonContainer: {
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '24px'
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

  enum TabValues {
    JSON = '0',
    HTML = '1',
    TABULAR = '2',
    ACCORDION = '3'
  }

  const [selectedTab, setSelectedTab] = React.useState(TabValues.JSON);

  const handleChange = (event: React.ChangeEvent<{}>, newTab: TabValues) => {
    setSelectedTab(newTab);
  };

  const history = useHistory();

  const displayJSONResults = () => {
    return (
      <>
        <Grid container item xs direction="column" justify="center" alignItems="center">
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
          {results && <ReactJson src={results} enableClipboard={true} theme="shapeshifter:inverted" collapsed={2} />}
          {patientFile && outputType !== 'dataRequirement' && <h2>Patient Bundle:</h2>}
          {patientFile && outputType !== 'dataRequirement' && (
            <ReactJson src={patientFile} enableClipboard={true} theme="shapeshifter:inverted" collapsed={2} />
          )}
        </Grid>
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
        {fhirpath.evaluate(results, 'MeasureReport.group').map((group: fhir4.MeasureReportGroup) => {
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
          detectedIssues.map((issue: fhir4.DetectedIssue, index: number) => {
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

  return (
    <TabContext value={selectedTab}>
      <AppBar position="static">
        <Tabs
          TabIndicatorProps={{ style: { background: 'white' } }}
          aria-label="results tabs"
          onChange={handleChange}
          value={selectedTab}
          indicatorColor="primary"
          variant="fullWidth"
          centered
        >
          <Tab label="Raw JSON" value={TabValues.JSON} />
          {shouldDisplayHTML() && <Tab label="Highlighted HTML" value={TabValues.HTML} />}
          {shouldDisplayTabular() && <Tab label="Tabular" value={TabValues.TABULAR} />}
          {shouldDisplayAccordion() && <Tab label="Accordion" value={TabValues.ACCORDION} />}
        </Tabs>
      </AppBar>
      <div className={classes.buttonContainer}>
        <Button variant="contained" onClick={() => history.push('/fqm-execution-demo')}>
          Home
        </Button>
      </div>
      <TabPanel value={TabValues.JSON}>{displayJSONResults()}</TabPanel>
      {shouldDisplayHTML() && <TabPanel value={TabValues.HTML}>{displayHTMLResults()}</TabPanel>}
      {shouldDisplayTabular() && <TabPanel value={TabValues.TABULAR}>{displayTabularResults()}</TabPanel>}
      {shouldDisplayAccordion() && <TabPanel value={TabValues.ACCORDION}>{displayAccordionResults()}</TabPanel>}
    </TabContext>
  );
};

export default Results;
