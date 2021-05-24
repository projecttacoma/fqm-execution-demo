import { atom, selector } from 'recoil';
import { measureFileState } from './bundles';

const measureDropdownSelector = selector({
  key: 'measureDropdownSelector',
  get: async () => {
    try {
      const response = await fetch('https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure');
      const data = await response.json();

      return data.map((n: { name: string }) => {
        return n.name;
      });
    } catch (e) {
      return [];
    }
  }
});

export const measureDropdownOptionsState = atom<string[]>({
  key: 'measureDropdownOptions',
  default: measureDropdownSelector
});

export const patientDropdownOptionsState = selector({
  key: 'patientDropdownOptions',
  get: async ({ get }) => {
    const { name } = get(measureFileState);

    if (name) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure/${name}/${name}-files`
        );
        const data = (await response.json()) as { name: string }[];
        return data
          .map(n => {
            return n.name;
          })
          .filter(n => {
            return n.startsWith('tests');
          });
      } catch (e) {
        return [];
      }
    }

    return [];
  }
});
