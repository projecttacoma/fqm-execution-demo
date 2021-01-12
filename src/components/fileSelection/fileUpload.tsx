import { Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { DropzoneRootProps, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { InputRowContext } from '../../contexts/inputRowContext';

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
  const onDrop = useContext(InputRowContext).onMeasureUpload;

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
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
  const onDrop = useContext(InputRowContext).onPatientUpload;

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
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
