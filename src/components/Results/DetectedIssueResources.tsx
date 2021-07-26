import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Typography } from '@material-ui/core';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { Enums } from 'fqm-execution';
import fhirpath from 'fhirpath';

interface Props {
  detectedIssue: R4.IDetectedIssue;
}

const DetectedIssueResources: React.FC<Props> = ({ detectedIssue }) => {
  const guidanceResponses = fhirpath.evaluate(detectedIssue, 'contained.GuidanceResponse');
  const guidanceResponseArray = [];

  for (let i = 0; i < guidanceResponses.length; i++) {
    const reasonCode = fhirpath.evaluate(guidanceResponses[i], 'reasonCode.coding.code')[0];
    if (reasonCode === Enums.CareGapReasonCode.MISSING || reasonCode === Enums.CareGapReasonCode.PRESENT) {
      guidanceResponseArray.push(guidanceResponses[i]);
    } else {
      guidanceResponseArray.unshift(guidanceResponses[i]);
    }
  }

  return (
    <div>
      {guidanceResponseArray.map((response: R4.IGuidanceResponse, index: number) => {
        const guidanceResponseId = fhirpath.evaluate(response, 'id');
        return (
          <Accordion key={guidanceResponseId}>
            <AccordionSummary>
              <Grid item xs>
                <h4>
                  {fhirpath.evaluate(response, 'resourceType')} {index + 1} (
                  {fhirpath.evaluate(response, 'reasonCode.coding.code')})
                </h4>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs direction="row">
                <Grid container item xs={6} direction="column">
                  <Grid item xs>
                    <h4>dataRequirement:</h4>
                  </Grid>
                  <Grid item xs>
                    type: {fhirpath.evaluate(response, 'dataRequirement.type')}
                  </Grid>
                  <Grid item xs>
                    <h5>codeFilter:</h5>
                  </Grid>
                  <Grid>path: {fhirpath.evaluate(response, 'dataRequirement.codeFilter.path[0]')}</Grid>
                  <Grid item xs>
                    <Typography style={{ overflowWrap: 'break-word' }}>
                      valueSet: {fhirpath.evaluate(response, 'dataRequirement.codeFilter.valueSet')}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    path: {fhirpath.evaluate(response, 'dataRequirement.codeFilter.path[1]')}
                  </Grid>
                  <Grid item xs>
                    {fhirpath.evaluate(response, 'dataRequirement.codeFilter.code.code').map((code: string) => {
                      return (
                        <Grid item xs key={code}>
                          code: {code}
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs>
                    <h5>dateFilter:</h5>
                  </Grid>
                  <Grid item xs>
                    path: {fhirpath.evaluate(response, 'dataRequirement.dateFilter.path')}
                  </Grid>
                  <Grid item xs>
                    valuePeriod:
                  </Grid>
                  <Grid item xs>
                    start: {fhirpath.evaluate(response, 'dataRequirement.dateFilter.valuePeriod.start')}
                  </Grid>
                  <Grid item xs>
                    end: {fhirpath.evaluate(response, 'dataRequirement.dateFilter.valuePeriod.end')}
                  </Grid>
                </Grid>
                <Grid container item xs={6} direction="column">
                  <Grid item xs>
                    <h4>reasonCode:</h4>
                  </Grid>
                  <Grid item xs>
                    system: {fhirpath.evaluate(response, 'reasonCode.coding.system')}
                  </Grid>
                  <Grid item xs>
                    code: {fhirpath.evaluate(response, 'reasonCode.coding.code')}
                  </Grid>
                  <Grid item xs>
                    display: {fhirpath.evaluate(response, 'reasonCode.coding.display')}
                  </Grid>
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
