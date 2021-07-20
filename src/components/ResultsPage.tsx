import React, { useState } from 'react';
import { HTML } from '../App';
import { useRecoilState, useRecoilValue } from 'recoil';
import { measureFileState, patientFileState } from '../state';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Results from './Results';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px'
  }
});

const ResultsPage: React.FC = () => {
  const styles = useStyles();
  const [htmls, setHTMLs] = useState<HTML[]>([]);
  const measureFile = useRecoilValue(measureFileState);
  const patientFile = useRecoilValue(patientFileState);
  const history = useHistory();
  return (
    <div className={styles.root}>
      <Results measureFile={measureFile} patientFile={patientFile} htmls={htmls} />
      <Button onClick={() => history.push('/home')}>Home</Button>
    </div>
  );
};

export default ResultsPage;
