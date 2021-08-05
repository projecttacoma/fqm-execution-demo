import { R4 } from '@ahryman40k/ts-fhir-types';
import fhirpath from 'fhirpath';

export function findPatientInBundle(bundle: R4.IBundle, patientID: string): R4.IPatient | null {
  const e = bundle.entry?.find(e => e.resource?.id === patientID);
  if (e === undefined) {
    return null;
  } else {
    return e?.resource as R4.IPatient;
  }
}

export function findMeasureInBundle(bundle: R4.IBundle, url: string): R4.IBundle_Entry {
  const e = bundle.entry?.find(e => fhirpath.evaluate(e, 'resource.url')[0] === url);
  return e as R4.IBundle_Entry;
}
