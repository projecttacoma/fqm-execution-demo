import { makeStyles, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { patientFileState } from '../../state';
import React from 'react';
import { PatientHelper } from '../Helpers';
import { useRecoilValue } from 'recoil';

const fhirpath = require('fhirpath');

const useStyles = makeStyles({
  table: {
    width: 100
  },
  tableCell: {
    padding: '0px 10px'
  }
});

interface Props {
  results: any;
  id: string;
}

const PopulationResults: React.FC<Props> = ({ results, id }) => {
  const patientFile = useRecoilValue(patientFileState);
  const patientResource = patientFile.content === null ? null : PatientHelper(patientFile.content, id[1]);
  const classes = useStyles();

  const columns = ['Patient Name', 'DOB', 'Gender'];

  for (let i = 0; i < fhirpath.evaluate(results, 'population').length; i++) {
    columns.push(fhirpath.evaluate(results, `population.code.coding.display[${i}]`));
  }

  const rows = [
    `${fhirpath.evaluate(patientResource, 'Patient.name.given')} ${fhirpath.evaluate(
      patientResource,
      'Patient.name.family'
    )}`,
    fhirpath.evaluate(patientResource, 'Patient.birthDate'),
    fhirpath.evaluate(patientResource, 'Patient.gender')
  ];

  for (let i in fhirpath.evaluate(results, 'population')) {
    rows.push(fhirpath.evaluate(results, `population.count[${i}]`));
  }

  return (
    <Table className={classes.table} size="small">
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell className={classes.tableCell} align="left">
              {column}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableCell align="left">{row}</TableCell>
        ))}
      </TableBody>
    </Table>
  );
};

export default PopulationResults;
