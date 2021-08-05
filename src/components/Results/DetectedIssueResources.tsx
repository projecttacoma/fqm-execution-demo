import React from 'react';
import { Accordion, AccordionDetails, Grid, Link, Typography, withStyles } from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { R4 } from '@ahryman40k/ts-fhir-types';
import { Enums } from 'fqm-execution';
import { measureFileState } from '../../state';
import { useRecoilValue } from 'recoil';
import { findMeasureInBundle } from '../Helpers';
import fhirpath from 'fhirpath';

interface Props {
  detectedIssue: R4.IDetectedIssue;
}

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)'
  },
  expanded: {}
})(MuiAccordionSummary);

const DetectedIssueResources: React.FC<Props> = ({ detectedIssue }) => {
  const guidanceResponses = fhirpath.evaluate(detectedIssue, 'contained.GuidanceResponse');
  const guidanceResponseArray: R4.IGuidanceResponse[] = [];
  const measureFile = useRecoilValue(measureFileState);

  guidanceResponses.forEach((element: R4.IGuidanceResponse) => {
    const reasonCode = fhirpath.evaluate(element, 'reasonCode.coding.code')[0];
    if (reasonCode === Enums.CareGapReasonCode.MISSING || reasonCode === Enums.CareGapReasonCode.PRESENT) {
      guidanceResponseArray.push(element);
    } else {
      guidanceResponseArray.unshift(element);
    }
  });

  return (
    <div>
      {guidanceResponseArray.map((response: R4.IGuidanceResponse, index: number) => {
        const guidanceResponseId = fhirpath.evaluate(response, 'id');
        const codeFilters = fhirpath.evaluate(response, 'dataRequirement.codeFilter');
        const link = 'http://hl7.org/fhir/';
        const valueSetObj = codeFilters.find((cf: any) => cf.valueSet);
        const codeFilterArray = codeFilters.filter((cf: any) => !cf.valueSet);
        const measureResource =
          measureFile.content === null
            ? null
            : findMeasureInBundle(measureFile.content, fhirpath.evaluate(valueSetObj, 'valueSet')[0]);

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
              <Grid container item xs direction="row" spacing={2}>
                <Grid container item xs={6} direction="column">
                  <Grid item xs>
                    <h4>Requirements:</h4>
                  </Grid>
                  <Grid item xs>
                    Type:{' '}
                    <Link href={link.concat(fhirpath.evaluate(response, 'dataRequirement.type'))}>
                      {fhirpath.evaluate(response, 'dataRequirement.type')}
                    </Link>
                  </Grid>
                  <Grid item xs>
                    <h4>Codes:</h4>
                    <h5>{fhirpath.evaluate(valueSetObj, 'path')}:</h5>
                  </Grid>
                  <Grid item xs>
                    {fhirpath.evaluate(measureResource, 'resource.name')}:
                    <Typography style={{ overflowWrap: 'break-word' }}>
                      <Link href={fhirpath.evaluate(valueSetObj, 'valueSet')}>
                        {fhirpath.evaluate(valueSetObj, 'valueSet')}
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    {codeFilterArray.map((cf: any) => {
                      const path = fhirpath.evaluate(cf, 'path');
                      return (
                        <Grid item xs key={path}>
                          <h5>{path}:</h5>
                          <Grid item xs>
                            {fhirpath.evaluate(cf, 'code.code').map((code: string) => {
                              return (
                                <Grid item xs key={code}>
                                  - {code}
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                  <Grid item xs>
                    <h4>Dates:</h4>
                    {fhirpath.evaluate(response, 'dataRequirement.dateFilter').map((df: any) => {
                      const path = fhirpath.evaluate(df, 'path');
                      const startDate = new Date(fhirpath.evaluate(df, 'valuePeriod.start')).toDateString();
                      const endDate = new Date(fhirpath.evaluate(df, 'valuePeriod.end')).toDateString();
                      return (
                        <Grid item xs key={path}>
                          <h5>{fhirpath.evaluate(df, 'path')}:</h5>
                          <Grid item xs>
                            {startDate === 'Invalid Date' ? 'any' : startDate} -{' '}
                            {endDate === 'Invalid Date' ? 'any' : endDate}
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid container item xs direction="column">
                  <Grid item xs>
                    <h4>Reason(s):</h4>
                    {fhirpath.evaluate(response, 'reasonCode').map((reason: R4.IGuidanceResponse) => {
                      const code = fhirpath.evaluate(reason, 'coding.code');
                      const display = fhirpath.evaluate(reason, 'coding.display');
                      return (
                        <Grid item xs key={code}>
                          - {code} ({display})
                        </Grid>
                      );
                    })}
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
