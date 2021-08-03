import React from 'react';
import { useRecoilValue } from 'recoil';
import { htmlsState, measureFileState, patientFileState } from '../state';
// import { useHistory } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import Results from './Results';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: '20px'
  }
});

const ResultsPage: React.FC = () => {
  const styles = useStyles();
  const htmls = useRecoilValue(htmlsState);
  const measureFile = useRecoilValue(measureFileState);
  const patientFile = useRecoilValue(patientFileState);
  // const history = useHistory();
  return (
    <div className={styles.root}>
      {/* <Button variant="contained" onClick={() => history.push('/fqm-execution-demo')}>
        Home
      </Button> */}
      <Results measureFile={measureFile} patientFile={patientFile} htmls={htmls} />
    </div>
  );
};

export default ResultsPage;
