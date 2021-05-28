import { R4 } from '@ahryman40k/ts-fhir-types';
import { atom } from 'recoil';

export interface FileUploadState {
  name: string | null;
  content: R4.IBundle | null;
  fromFileUpload?: boolean;
}

export const measureFileState = atom<FileUploadState>({
  key: 'measureFile',
  default: {
    name: null,
    content: null
  }
});

export const patientFileState = atom<FileUploadState>({
  key: 'patientFile',
  default: {
    name: null,
    content: null
  }
});
