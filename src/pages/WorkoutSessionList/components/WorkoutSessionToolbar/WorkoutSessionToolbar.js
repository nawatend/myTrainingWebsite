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

const WorkoutSessionToolbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const history = useHistory()
  const handleAdd = (e) => {

    history.push("/workoutsessions/create")
  }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />

        <Button
          color="primary"
          variant="contained"
          onClick={handleAdd}
        >
          Add workout session
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search workout session name or focus"
          onChange={props.searchBarOnChange}
        />
      </div>
    </div>
  );
};

WorkoutSessionToolbar.propTypes = {
  className: PropTypes.string
};

export default WorkoutSessionToolbar;
