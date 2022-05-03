export interface ValueFilterExtensionPath extends fhir4.Extension {
  url: 'path';
  valueString: string;
}

export type Comparator = 'eq' | 'gt' | 'lt' | 'ge' | 'le';

export interface ValueFilterExtensionComparator extends fhir4.Extension {
  url: 'comparator';
  valueCode: Comparator;
}

export interface ValueFilterExtensionValue extends fhir4.Extension {
  url: 'value';
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueQuantity?: fhir4.Quantity;
  valueRatio?: fhir4.Ratio;
  valueRange?: fhir4.Range;
}

export interface ValueFilterExtension extends fhir4.Extension {
  url: 'http://hl7.org/fhir/us/cqfmeasures/StructureDefinition/cqfm-valueFilter';
  extension: [ValueFilterExtensionPath, ValueFilterExtensionComparator, ValueFilterExtensionValue];
}
