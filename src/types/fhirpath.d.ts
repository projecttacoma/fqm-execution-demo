declare module 'fhirpath' {
  export function evaluate(resourceObject: any, fhirPathExpression: string): any;
}
