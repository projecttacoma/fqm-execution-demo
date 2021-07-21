import { atom } from 'recoil';

export interface HTML {
  groupId: string;
  html: string;
}

export const htmlsState = atom<HTML[]>({
  key: 'htmls',
  default: []
});
