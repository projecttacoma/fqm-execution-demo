import React from 'react';
import {
  Accordion,
  AccordionDetails,
  Grid,
  Link,
  Typography,
  withStyles,
  Popover,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { Enums } from 'fqm-execution';
import { measureFileState, patientFileState } from '../../state';
import { useRecoilValue } from 'recoil';
import { findResourceInBundle, findValueSetInBundle } from '../Helpers';
import fhirpath from 'fhirpath';

interface Props {
  detectedIssue: fhir4.DetectedIssue;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: { pointerEvents: 'none' },
    paper: {
      padding: theme.spacing(1)
    },
    reasonDetail: {
      paddingLeft: '32px',
      paddingTop: '12px',

      '&:hover': {
        cursor: 'pointer'
      }
    }
  })
);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)'
  },
  expanded: {}
})(MuiAccordionSummary);

const DetectedIssueResources: React.FC<Props> = ({ detectedIssue }) => {
  const guidanceResponses = fhirpath.evaluate(detectedIssue, 'contained.GuidanceResponse');
  const guidanceResponseArray: fhir4.GuidanceResponse[] = [];
  const measureFile = useRecoilValue(measureFileState);
  const patientFile = useRecoilValue(patientFileState);
  const classes = useStyles();
  const [popoverContent, setPopoverContent] = React.useState<any>(null);
  const [popup, setPopup] = React.useState<HTMLElement | null>(null);
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    reasonDetailExtension: fhir4.Extension
  ) => {
    const reference = fhirpath.evaluate(reasonDetailExtension, 'extension.valueReference.reference')[0];
    if (patientFile.content) {
      const resource = findResourceInBundle(patientFile.content, reference);
      setPopup(event.currentTarget);
      setPopoverContent(JSON.stringify(resource, null, 2));
    }
  };
  const handlePopoverClose = () => {
    setPopup(null);
    setPopoverContent(null);
  };
  const open = Boolean(popup);

  guidanceResponses.forEach((element: fhir4.GuidanceResponse) => {
    const reasonCode = fhirpath.evaluate(element, 'reasonCode.coding.code')[0];
    if (reasonCode === Enums.CareGapReasonCode.MISSING || reasonCode === Enums.CareGapReasonCode.PRESENT) {
      guidanceResponseArray.push(element);
    } else {
      guidanceResponseArray.unshift(element);
    }
  });

  return (
    <div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={popup}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onClose={handlePopoverClose}
      >
        <pre style={{ tabSize: 2 }}>
          <code>{popoverContent}</code>
        </pre>
      </Popover>
      {guidanceResponseArray.map((response: fhir4.GuidanceResponse, index: number) => {
        const guidanceResponseId = fhirpath.evaluate(response, 'id');
        const codeFilters = fhirpath.evaluate(response, 'dataRequirement.codeFilter');
        const link = 'http://hl7.org/fhir/';
        const valueSetObj = codeFilters.find((cf: any) => cf.valueSet);
        const codeFilterArray = codeFilters.filter((cf: any) => !cf.valueSet);
        const valueSetResource =
          measureFile.content === null
            ? null
            : findValueSetInBundle(measureFile.content, fhirpath.evaluate(valueSetObj, 'valueSet')[0]);

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
                    {valueSetResource?.name}:
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
                    {fhirpath.evaluate(response, 'reasonCode').map((reason: fhir4.GuidanceResponse) => {
                      const code = fhirpath.evaluate(reason, 'coding.code');
                      const display = fhirpath.evaluate(reason, 'coding.display');
                      const extension = fhirpath.evaluate(reason, "coding.extension.where(url='ReasonDetail')")[0];

                      return (
                        <Grid item xs key={code}>
                          - {code} ({display})
                          {extension && (
                            <div
                              className={classes.reasonDetail}
                              aria-owns={open ? 'mouse-over-popover' : undefined}
                              aria-haspopup="true"
                              onMouseEnter={e => handlePopoverOpen(e, extension)}
                              onMouseLeave={handlePopoverClose}
                            >
                              {fhirpath.evaluate(extension, 'extension.valueReference.reference')} (
                              {fhirpath.evaluate(extension, 'extension.valueString')})
                            </div>
                          )}
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
