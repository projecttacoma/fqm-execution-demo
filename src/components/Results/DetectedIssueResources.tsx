import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
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
        return (
          <Accordion>
            <AccordionSummary>
              <Typography>
                <div> {fhirpath.evaluate(response, 'resourceType')} </div>
                <div> id = {fhirpath.evaluate(response, 'id')} </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div> reasonCode = {fhirpath.evaluate(response, 'reasonCode.coding.code')} </div>
                <div> display = {fhirpath.evaluate(response, 'reasonCode.coding.display')} </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default DetectedIssueResources;
