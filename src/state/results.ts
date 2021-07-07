import { atom } from 'recoil';

export const resultsState = atom<any>({
  key: 'results',
  default: null
});
