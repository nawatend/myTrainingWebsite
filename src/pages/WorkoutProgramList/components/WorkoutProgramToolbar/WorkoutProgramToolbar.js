import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { SearchInput } from 'components';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const WorkoutProgramToolbar = props => {
  const { className, ...rest } = props;

  const history = useHistory()
  const classes = useStyles();

  const handleAdd = (e) => {
   
    history.push("/workoutprograms/create")
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleAdd}
        >
          Add Workout Program
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search workout program"
        />
      </div>
    </div>
  );
};

WorkoutProgramToolbar.propTypes = {
  className: PropTypes.string
};

export default WorkoutProgramToolbar;
