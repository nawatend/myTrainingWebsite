import { Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const WorkoutProgramTable = props => {
  const { className, workoutPrograms, ...rest } = props;
  const history = useHistory()
  const classes = useStyles();

  const [selectedWorkoutPrograms, setSelectedWorkoutPrograms] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { workoutPrograms } = props;

    let selectedWorkoutProgram;

    if (event.target.checked) {
      selectedWorkoutProgram = workoutPrograms.map(workoutProgram => workoutProgram.id);
    } else {
      selectedWorkoutProgram = [];
    }

    setSelectedWorkoutPrograms(selectedWorkoutProgram);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedWorkoutPrograms.indexOf(id);
    let newSelectedWorkoutPrograms = [];

    if (selectedIndex === -1) {
      newSelectedWorkoutPrograms = newSelectedWorkoutPrograms.concat(selectedWorkoutPrograms, id);
    } else if (selectedIndex === 0) {
      newSelectedWorkoutPrograms = newSelectedWorkoutPrograms.concat(selectedWorkoutPrograms.slice(1));
    } else if (selectedIndex === selectedWorkoutPrograms.length - 1) {
      newSelectedWorkoutPrograms = newSelectedWorkoutPrograms.concat(selectedWorkoutPrograms.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedWorkoutPrograms = newSelectedWorkoutPrograms.concat(
        selectedWorkoutPrograms.slice(0, selectedIndex),
        selectedWorkoutPrograms.slice(selectedIndex + 1)
      );
    }

    setSelectedWorkoutPrograms(newSelectedWorkoutPrograms);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleRowOnClick = (id) => {
    history.push('/workoutPrograms/detail/' + id)
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workoutPrograms.slice(0, rowsPerPage).map(workoutProgram => (
                  <TableRow
                    onClick={(e) => {
                      e.preventDefault()
                      history.push('/workoutprograms/detail/' + workoutProgram.id)
                    }}
                    className={classes.tableRow}
                    hover
                    key={workoutProgram.id}
                    selected={selectedWorkoutPrograms.indexOf(workoutProgram.id) !== -1}
                  >
                    <TableCell>{workoutProgram.id}</TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        {/* <Avatar
                          className={classes.avatar}
                          src={workoutProgram.avatarUrl}
                        >
                          {getInitials(workoutProgram.title)}
                        </Avatar> */}
                        <Typography variant="body1">{workoutProgram.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{workoutProgram.type}</TableCell>
                    <TableCell>
                      {moment(workoutProgram.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={workoutPrograms.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

WorkoutProgramTable.propTypes = {
  className: PropTypes.string,
  workoutPrograms: PropTypes.array.isRequired
};

export default WorkoutProgramTable;
