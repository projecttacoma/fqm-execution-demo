import { CalculatorTypes } from 'fqm-execution';
import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

export interface OptionsRowInterface {
  outputType: string;
  setOutputType: Dispatch<SetStateAction<string>>;
  measurementPeriodStart: Date | null;
  setMeasurementPeriodStart: Dispatch<SetStateAction<Date | null>>;
  measurementPeriodEnd: Date | null;
  setMeasurementPeriodEnd: Dispatch<SetStateAction<Date | null>>;
  calculationOptions: CalculatorTypes.CalculationOptions;
  setCalculationOptions: Dispatch<SetStateAction<CalculatorTypes.CalculationOptions>>;
}

export const OptionsRowContext = createContext<OptionsRowInterface>({
  outputType: 'raw',
  setOutputType: () => {},
  measurementPeriodStart: new Date('1/1/2019'),
  setMeasurementPeriodStart: () => {},
  measurementPeriodEnd: new Date('12/31/2019'),
  setMeasurementPeriodEnd: () => {},
  calculationOptions: {
    calculateHTML: false,
    calculateSDEs: false,
    includeClauseResults: false,
    includeHighlighting: false,
    includePrettyResults: false
  },
  setCalculationOptions: () => {}
});

const OptionsRowProvider = ({ children }: { children: any }) => {
  const [outputType, setOutputType] = useState<string>('raw');
  const [measurementPeriodStart, setMeasurementPeriodStart] = useState<Date | null>(new Date('1/1/2019'));
  const [measurementPeriodEnd, setMeasurementPeriodEnd] = useState<Date | null>(new Date('12/31/2019'));
  const [calculationOptions, setCalculationOptions] = useState<CalculatorTypes.CalculationOptions>({
    calculateHTML: false,
    calculateSDEs: false,
    includeClauseResults: false,
    includeHighlighting: false,
    includePrettyResults: false
  });

  return (
    <OptionsRowContext.Provider
      value={{
        outputType,
        setOutputType,
        measurementPeriodStart,
        setMeasurementPeriodStart,
        measurementPeriodEnd,
        setMeasurementPeriodEnd,
        calculationOptions,
        setCalculationOptions
      }}
    >
      {children}
    </OptionsRowContext.Provider>
  );
};
export default OptionsRowProvider;
