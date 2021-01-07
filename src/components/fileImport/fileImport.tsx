import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
);
interface Props {
  options: string[];
  handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectedValue: string;
}
export default function MultipleSelect(props: Props) {
  const classes = useStyles();
  return (
    <div style={{ width: '100%' }}>
      <FormControl className={classes.root}>
        <Select
          value={props.selectedValue}
          onChange={props.handleChange}
          inputProps={{
            id: 'select-multiple-native'
          }}
        >
          {props.options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
