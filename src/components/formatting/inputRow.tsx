import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../fileUpload/FileUpload';

export default function InputRow() {
  const [measureFileName, setMeasureFileName] = useState<string | null>(null);
  const [patientFileName, setPatientFileName] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const [measureBundle, setMeasureBundle] = useState<any>(null);
  const [patientBundle, setPatientBundle] = useState<any>(null);

  const onMeasureUpload = useCallback(files => {
    const measureBundleFile = files[0];
    setMeasureFileName(measureBundleFile);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setMeasureBundle(JSON.parse(reader.result as string));
    };
    reader.readAsText(measureBundleFile);
  }, []);

  const onPatientUpload = useCallback(files => {
    const patientBundleFile = files[0];
    setPatientFileName(patientBundleFile);
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPatientBundle(JSON.parse(reader.result as string));
    };
    reader.readAsText(patientBundleFile);
  }, []);
  return (
    <React.Fragment>
      <Grid item xs={6}>
        <h2>Measure Bundle:</h2>
        {<FileUpload onDrop={onMeasureUpload} />}
      </Grid>
      <Grid item xs={6}>
        <h2>Patient Bundle:</h2>
        {<FileUpload onDrop={onPatientUpload} />}
      </Grid>
    </React.Fragment>
  );
}
