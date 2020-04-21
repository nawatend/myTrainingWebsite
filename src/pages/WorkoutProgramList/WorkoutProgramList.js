import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { WorkoutProgramToolbar, WorkoutProgramCard } from './components';
import mockData from './data';


//api
import { WorkoutProgramService, TrainerService } from '../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const WorkoutProgramList = () => {
  const classes = useStyles();

  const [workoutPrograms, setWorkoutPrograms] = useState([]);

  const [trainerId, setTrainerId] = useState(null)

  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))

  }, [trainerId])

  useEffect(() => {
    if (trainerId !== null) {


      WorkoutProgramService.getWorkoutProgramsByTrainer(trainerId)
        .then((res) => {
          console.log(res)
          setWorkoutPrograms(res)
        }).catch((e) => console.log('exercises not found'))
    }
  }, [trainerId])

  return (
    <div className={classes.root}>
      <WorkoutProgramToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {workoutPrograms.map(workoutProgram => (
            <Grid
              item
              key={workoutProgram.id}
              lg={4}
              md={6}
              xs={12}
            >
              <WorkoutProgramCard workoutProgram={workoutProgram} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default WorkoutProgramList;
