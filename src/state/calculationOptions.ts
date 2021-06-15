import { atom } from 'recoil';
import { CalculatorTypes } from 'fqm-execution';

export const calculationOptionsState = atom<CalculatorTypes.CalculationOptions>({
  key: 'calculationOptions',
  default: {
    calculateHTML: false,
    calculateSDEs: false
  }
});
