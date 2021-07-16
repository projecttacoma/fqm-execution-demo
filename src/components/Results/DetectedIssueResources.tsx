import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { R4 } from '@ahryman40k/ts-fhir-types';
import fhirpath from 'fhirpath';

interface Props {
  detectedIssue: R4.IDetectedIssue;
}

const DetectedIssueResources: React.FC<Props> = ({ detectedIssue }) => {
  const guidanceResponseArray = fhirpath.evaluate(detectedIssue, 'contained.GuidanceResponse');

  return (
    <div>
      {guidanceResponseArray.map((response: R4.IGuidanceResponse) => {
        const guidanceResponseId = fhirpath.evaluate(response, 'id');
        return (
          <Accordion key={guidanceResponseId}>
            <AccordionSummary>
              <Grid item xs>
                <h4>
                  {' '}
                  {fhirpath.evaluate(response, 'resourceType')} {guidanceResponseId}{' '}
                </h4>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs>
                <Grid item xs>
                  code: {fhirpath.evaluate(response, 'reasonCode.coding.code')}
                </Grid>
                <Grid item xs>
                  display: {fhirpath.evaluate(response, 'reasonCode.coding.display')}
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default DetectedIssueResources;
