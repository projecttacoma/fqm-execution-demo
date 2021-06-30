import { makeStyles, Grid, IconButton } from '@material-ui/core';
import ReactJson from 'react-json-view';
import parse from 'html-react-parser';
import fileDownload from 'js-file-download';
import React from 'react';
import { FileUploadState } from '../../state';
import { GetApp } from '@material-ui/icons';
import { HTML } from '../../App';
import { PopulationResults } from '../Results';

const fhirpath = require('fhirpath');

const useStyles = makeStyles(() => ({
  highlightedMarkup: {
    '& pre': {
      whiteSpace: 'pre-wrap'
    }
  }
}));

interface Props {
  results: any;
  measureFile: FileUploadState;
  htmls: HTML[];
}

const Results: React.FC<Props> = ({ results, measureFile, htmls }) => {
  const classes = useStyles();
  const id = results ? (fhirpath.evaluate(results, 'MeasureReport.subject.reference'))[0].split('/') : '';

  return (
    <Grid container>
      <Grid container item xs={6} direction="column">
        <Grid container direction="row">
          <h2>Results:</h2>
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
        {results && fhirpath.evaluate(results, 'MeasureReport.group').map((group:any) => {
          return (
            <Grid container> 
              <h3>{group.id} Population Results</h3>
              <PopulationResults key={group.id} results={group} id={id}/>
            </Grid>
          )}
        )}
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
  );
};

export default Results;
