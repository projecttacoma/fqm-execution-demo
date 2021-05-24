import { atom } from 'recoil';

export const outputTypeState = atom<string>({
  key: 'outputType',
  default: 'rawResults'
});
