import React, { createContext, Dispatch, useCallback, useEffect, useState } from 'react';
import { DropEvent, FileRejection } from 'react-dropzone';

export interface InputRowInterface {
  onMeasureUpload: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
  onPatientUpload: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => void;
  measureFileName: string | null;
  setMeasureFileName: (files: any) => void;
  patientFileName: string | null;
  setPatientFileName: (files: any) => void;
  onMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onECQMMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  onECQMPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  measureOptions: string[];
  ecqmMeasureOptions: string[];
  patientOptions: string[];
  ecqmPatientOptions: string[];
  setPatientOptions: any;
  setECQMPatientOptions: any;
  measureBundle: any;
  patientBundle: any;
  setMeasureBundle: Dispatch<any>;
  setPatientBundle: Dispatch<any>;
}

export const InputRowContext = createContext<InputRowInterface>({
  onMeasureUpload: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => null,
  onPatientUpload: <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) => null,
  measureFileName: null,
  setMeasureFileName: (files: any) => null,
  patientFileName: null,
  setPatientFileName: (files: any) => null,
  onMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => null,
  onECQMMeasureDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => null,
  onPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => null,
  onECQMPatientDropdownChange: (event: React.ChangeEvent<{ value: unknown }>) => null,
  measureOptions: [],
  ecqmMeasureOptions: [],
  patientOptions: [],
  ecqmPatientOptions: [],
  setECQMPatientOptions: null,
  setPatientOptions: null,
  measureBundle: null,
  patientBundle: null,
  setMeasureBundle: () => {},
  setPatientBundle: () => {}
});

const InputRowProvider = ({ children }: { children: any }) => {
  const [measureBundle, setMeasureBundle] = useState<any>(null);
  const [patientBundle, setPatientBundle] = useState<any>(null);
  const [measureFileName, setMeasureFileName] = useState<string | null>(null);
  const [patientFileName, setPatientFileName] = useState<string | null>(null);
  const [measureOptions, setMeasureOptions] = useState<string[]>([]);
  const [ecqmMeasureOptions, setECQMMeasureOptions] = useState<string[]>([]);
  const [patientOptions, setPatientOptions] = useState<string[]>([]);
  const [ecqmPatientOptions, setECQMPatientOptions] = useState<string[]>([]);
  const onMeasureUpload = useCallback(files => {
    const measureBundleFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setMeasureFileName(measureBundleFile.path);
      setMeasureBundle(JSON.parse(reader.result as string));
    };
    reader.readAsText(measureBundleFile);
  }, []);
  const onPatientUpload = useCallback(files => {
    const patientBundleFile = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPatientFileName(patientBundleFile.path);
      setPatientBundle(JSON.parse(reader.result as string));
    };
    reader.readAsText(patientBundleFile);
  }, []);

  const onMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let name = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/` +
        name +
        `/` +
        name +
        `-bundle.json`
    )
      .then(response => response.json())
      .then(data => {
        setMeasureFileName(name);

        setMeasureBundle(data);
        return fetch(
          `https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure/${name}/${name}-files`
        );
      })
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        const filteredNames = names.filter((name: string) => {
          return name.startsWith('tests');
        });
        setPatientOptions(filteredNames);
      })
      .catch(error => console.log('error: ', error));
  };
  const onECQMMeasureDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let name = event.target.value as string;
    fetch(
      `https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/` +
        name +
        `/` +
        name +
        `-bundle.json`
    )
      .then(response => response.json())
      .then(data => {
        setMeasureFileName(name);
        setMeasureBundle(data);
        return fetch(
          `https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure/${name}/${name}-files`
        );
      })
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        const filteredNames = names.filter((name: string) => {
          return name.startsWith('tests');
        });
        setECQMPatientOptions(filteredNames);
      })
      .catch(error => console.log('error: ', error));
  };
  const onPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const patientName = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/DBCG/connectathon/master/fhir401/bundles/measure/${measureFileName}/${measureFileName}-files/${patientName}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientBundle(data);
        setPatientFileName(patientName);
      });
  };

  const onECQMPatientDropdownChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const patientName = event.target.value as string;

    fetch(
      `https://raw.githubusercontent.com/cqframework/ecqm-content-r4/master/bundles/measure/${measureFileName}/${measureFileName}-files/${patientName}`
    )
      .then(response => response.json())
      .then(data => {
        setPatientBundle(data);
        setPatientFileName(patientName);
      });
  };

  useEffect(() => {
    fetch(`https://api.github.com/repos/dbcg/connectathon/contents/fhir401/bundles/measure`)
      .then(response => response.json())
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        setMeasureOptions(names);
        return fetch(`https://api.github.com/repos/cqframework/ecqm-content-r4/contents/bundles/measure`);
      })
      .then(response => {
        if (response.status === 403) {
          if (response.headers.get('X-RateLimit-Reset') != null) {
            let resetTime = new Date(parseInt(response.headers.get('X-RateLimit-Reset') as string) * 1000);
            throw new Error(`GitHub Rate Limited until: ${resetTime}`);
          } else {
            throw new Error('Auth error with GitHub.');
          }
        }
        return response.json();
      })
      .then(data => {
        const names = data.map((n: { name: string }) => {
          return n.name;
        });
        setECQMMeasureOptions(names);
      })
      .catch(e => {
        console.error('Error fetching from GitHub', e);
      });
  }, []);
  return (
    <InputRowContext.Provider
      value={{
        onMeasureUpload,
        onPatientUpload,
        measureFileName,
        patientFileName,
        setPatientFileName,
        setMeasureFileName,
        onMeasureDropdownChange,
        onECQMMeasureDropdownChange,
        onPatientDropdownChange,
        onECQMPatientDropdownChange,
        measureOptions,
        ecqmMeasureOptions,
        patientOptions,
        ecqmPatientOptions,
        setECQMPatientOptions,
        setPatientOptions,
        measureBundle,
        patientBundle,
        setMeasureBundle,
        setPatientBundle
      }}
    >
      {children}
    </InputRowContext.Provider>
  );
};

export default InputRowProvider;
