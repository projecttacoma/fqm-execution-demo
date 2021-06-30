import { R4 } from '@ahryman40k/ts-fhir-types';

export default function PatientHelper(bundle: R4.IBundle, patientID: string): R4.IPatient {
    const e = bundle.entry?.find(e => e.resource?.id === patientID);
    return e?.resource as R4.IPatient;
} 