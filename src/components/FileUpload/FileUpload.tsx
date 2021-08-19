import { Grid } from '@material-ui/core';
import React, { useCallback } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { measureFileState, patientFileState, resultsState, outputTypeState } from '../../state';

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: DropzoneRootProps) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #7f7f7f;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const MeasureFileUpload = () => {
  const setMeasureFileState = useSetRecoilState(measureFileState);
  const setResults = useSetRecoilState(resultsState);

  const onMeasureUpload = useCallback(
    files => {
      setResults(null);
      const measureBundleFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setMeasureFileState({
          name: measureBundleFile.path,
          content: JSON.parse(reader.result as string) as fhir4.Bundle,
          fromFileUpload: true
        });
      };
      reader.readAsText(measureBundleFile);
    },
    [setMeasureFileState, setResults]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: onMeasureUpload,
    accept: '.json'
  });

  return (
    <Grid item xs={12}>
      <Container {...getRootProps({ className: 'dropzone', isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag and drop file here, or click to select file</p>
      </Container>
    </Grid>
  );
};

export const PatientFileUpload = () => {
  const setPatientFileState = useSetRecoilState(patientFileState);
  const setResults = useSetRecoilState(resultsState);
  const outputType = useRecoilValue(outputTypeState);

  const onPatientUpload = useCallback(
    files => {
      setResults(null);
      const patientBundleFile = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPatientFileState({
          name: patientBundleFile.path,
          content: JSON.parse(reader.result as string) as fhir4.Bundle,
          fromFileUpload: true
        });
      };
      reader.readAsText(patientBundleFile);
    },
    [setPatientFileState, setResults]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop: onPatientUpload,
    accept: '.json',
    disabled: outputType === 'dataRequirement'
  });

  return (
    <Grid item xs={12}>
      <Container {...getRootProps({ className: 'dropzone', isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag and drop file here, or click to select file</p>
      </Container>
    </Grid>
  );
};
