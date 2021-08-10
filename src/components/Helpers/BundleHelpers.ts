import { R4 } from '@ahryman40k/ts-fhir-types';

export function findPatientInBundle(bundle: R4.IBundle, patientID: string): R4.IPatient | null {
  const e = bundle.entry?.find(e => e.resource?.resourceType === 'Patient' && e.resource?.id === patientID);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as R4.IPatient;
  }
}

export function findValueSetInBundle(bundle: R4.IBundle, url: string): R4.IValueSet | null {
  const e = bundle.entry?.find(e => e.resource?.resourceType === 'ValueSet' && e.resource?.url === url);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as R4.IValueSet;
  }
}

export function findResourceInBundle(bundle: R4.IBundle, reference: string): R4.IResourceList | null {
  const [resourceType, id] = reference.split('/');
  const e = bundle.entry?.find(e => e.resource?.resourceType === resourceType && e.resource?.id === id);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as R4.IResourceList;
  }
}
