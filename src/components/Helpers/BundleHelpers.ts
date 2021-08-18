export function findPatientInBundle(bundle: fhir4.Bundle, patientID: string): fhir4.Patient | null {
  const e = bundle.entry?.find(e => e.resource?.resourceType === 'Patient' && e.resource?.id === patientID);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as fhir4.Patient;
  }
}

export function findValueSetInBundle(bundle: fhir4.Bundle, url: string): fhir4.ValueSet | null {
  const e = bundle.entry?.find(e => e.resource?.resourceType === 'ValueSet' && e.resource?.url === url);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as fhir4.ValueSet;
  }
}

export function findResourceInBundle(bundle: fhir4.Bundle, reference: string): fhir4.Resource | null {
  const [resourceType, id] = reference.split('/');
  const e = bundle.entry?.find(e => e.resource?.resourceType === resourceType && e.resource?.id === id);
  if (e === undefined) {
    return null;
  } else {
    return e.resource as fhir4.Resource;
  }
}
