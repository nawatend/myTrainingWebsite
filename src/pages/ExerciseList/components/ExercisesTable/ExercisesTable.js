import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { getInitials } from 'helpers';
import { CloudinaryContext, Image } from "cloudinary-react";

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
  },
  image: {
    width: '70%',
    margin: 0
  },
  rowImage: {
    maxWidth: '20%',
    width: '20%',
    margin: 0
  }
}));

const ExercisesTable = props => {
  const { className, exercises, ...rest } = props;
  const history = useHistory()
  const classes = useStyles();

  const [selectedExercises, setSelectedExercises] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { exercises } = props;

    let selectedExercises;

    if (event.target.checked) {
      selectedExercises = exercises.map(exercise => exercise.id);
    } else {
      selectedExercises = [];
    }

    setSelectedExercises(selectedExercises);
  };

 
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleRowOnClick = (id) => {
    history.push('/exercises/detail/' + id)
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
                  <TableCell>Thumbnail</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Cardio Level</TableCell>
                  <TableCell>Muscle Level</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises.slice(0, rowsPerPage).map(exercise => (
                  <TableRow
                    onClick={(e) => {
                      e.preventDefault()
                      history.push('/exercises/detail/' + exercise.id)
                    }}
                    className={classes.tableRow}
                    hover
                    key={exercise.id}
                    selected={selectedExercises.indexOf(exercise.id) !== -1}
                  >
                    <TableCell>{exercise.id}</TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{exercise.title}</Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.rowImage}  >
                      <CloudinaryContext cloudName="filesmytraining">
                        <Image
                          className={classes.image}
                          alt="WorkoutSession"
                          key={exercise.id}
                          publicId={exercise.imageName}
                          fetch-format="auto"
                          quality="auto"
                        />

                      </CloudinaryContext>
                      </TableCell>

                    <TableCell>{exercise.type}</TableCell>
                    <TableCell>
                      {exercise.cardioLevel}
                    </TableCell>
                    <TableCell>{exercise.muscleLevel}</TableCell>
                    <TableCell>
                      {moment(exercise.createdAt).format('DD/MM/YYYY')}
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
          count={exercises.length}
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

ExercisesTable.propTypes = {
  className: PropTypes.string,
  exercises: PropTypes.array.isRequired
};

export default ExercisesTable;
