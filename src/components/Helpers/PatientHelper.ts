import { R4 } from '@ahryman40k/ts-fhir-types';

export function findPatientInBundle(bundle: R4.IBundle, patientID: string): R4.IPatient | null {
  const e = bundle.entry?.find(e => e.resource?.id === patientID);
  if (e === undefined) {
    return null;
  } else {
    return e?.resource as R4.IPatient;
  }
}
