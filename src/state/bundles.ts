import { atom } from 'recoil';

export interface FileUploadState {
  name: string | null;
  content: fhir4.Bundle | null;
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
