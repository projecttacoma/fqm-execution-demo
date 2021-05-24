import { atom } from 'recoil';

export interface MeasurementPeriodState {
  measurementPeriodStart: Date | null;
  measurementPeriodEnd: Date | null;
}

export const measurementPeriodState = atom<MeasurementPeriodState>({
  key: 'measurementPeriod',
  default: {
    measurementPeriodStart: new Date('1/1/2019'),
    measurementPeriodEnd: new Date('12/31/2019')
  }
});
