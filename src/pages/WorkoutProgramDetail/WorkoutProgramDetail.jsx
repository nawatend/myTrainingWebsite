import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useHistory, Redirect, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Divider
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CloudinaryContext, Image, Video, Transformation } from "cloudinary-react";
import moment from 'moment';

//api
import { SporterService, ExerciseBaseService, WorkoutProgramService, ExerciseFullService, WorkoutSessionService, TrainerService } from '../../services/api'

//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'

import ExercisesPreview from './components/ExercisesPreview'
import WorkoutSessionsPreview from './components/WorkoutSessionsPreview'
import AssignSporter from './components/AssignSporter'
import RemoveSporter from './components/RemoveSporter'
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(10)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    //alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  main: {
    width: '100%',
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    //flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  divider: {
    // backgroundColor: theme.palette.primary.light,
    marginBottom: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  textField: {
    marginTop: theme.spacing(2),
    display: 'block'
  },
  image: {
    margin: theme.spacing(2, 0),
    width: '100%',
    borderWidth: '1px',
    borderColor: theme.palette.primary.light,
    borderStyle: 'solid',
    borderRadius: '4px'
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));


let WorkoutProgramDetail = (props) => {
  const { history } = props;
  const { id } = useParams()

  const classes = useStyles();
  const [sporters, setSporters] = useState([])
  const [isAuth, setIsAuth] = useState(true)
  const [loading, setLoading] = useState(true)
  const [trainerId, setTrainerId] = useState(null)
  const [sporter, setSporter] = useState({ user: { fullName: '' } })

  const [values, setValues] = useState({
    id: 1144,
    title: 'Workout Session not found!',
    type: '',
    imageName: '',
    cardioLevel: 0,
    muscleLevel: 0,
    createdAt: '',
    trainerId: '',
    workoutSessions: [],
    sporterName: '',
    sporterId: null,
    isUpdated: false
  })


  useEffect(() => {
    if (loading) {
      console.log("WP")
      WorkoutProgramService.getWorkoutProgramById(id)
        .then((WSDetail) => {
          return WSDetail
        }).then((data) => {
          WorkoutSessionService.getWorkoutSessionsByWorkoutProgram(id)
            .then((workoutSessions) => {
              setValues({ ...values, ...data, workoutSessions: [...workoutSessions] })
              setLoading(false)
            }).catch(error => {
              console.log(error)
              history.push('/workoutprograms')
            })
        })

      // .catch(error => {
      //   console.log(error)
      //   history.push('/workoutsessions')
      // })

    }
  }, [id])

  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log("TrainerId")
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))
  }, [trainerId])

  useEffect(() => {

    SporterService.getSportersByTrainer({ trainerId: trainerId })
      .then((res) => {
        console.log("sporters")
        setSporters(res)
      }).catch((e) => console.log('sporters not found'))
  }, [values])

  useEffect(() => {
    SporterService.sporterByWorkoutProgramId({ workoutProgramId: id })
      .then((res) => {
        console.log(res)
        if (res.data.id !== undefined) {
          setSporter(res.data)
        }
      }).catch((e) => console.log('sporters not found'))
  }, [values.sporterId, values.isUpdated])

  const handleEdit = () => {
    history.push('/workoutprograms/edit/' + id)
  };

  const handleBack = () => {
    history.goBack();
  };

  const assignSporterToTrainer = (e, sporterId) => {
    e.preventDefault()
    SporterService.assignWorkoutProgram({ sporterId: sporterId, workoutProgramId: id })
      .then((res) => {
        console.log("Assigned")
        setValues({ ...values, sporterName: res.data.user.fullName, sporterId: res.data.id })
      })
      .catch((e) => console.log(e))
  }

  const removeSporter = (e) => {
    e.preventDefault()
    SporterService.assignWorkoutProgram({ sporterId: sporter.id, workoutProgramId: null })
      .then((res) => {
        console.log(res)
        setValues({ ...values, sporterName: '', sporterId: null, isUpdated: true })
        setSporter({ user: { fullName: '' } })
      })
      .catch((e) => console.log(e))
  }


  if (!isAuth) {
    return (
      <Redirect to='/sign-in' />
    )
  } else {

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          spacing={3}
        >
          <Grid
            className={classes.content}
            item
            lg={12}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>

                <Button
                  color="primary"
                  variant="text"
                  onClick={handleEdit}
                >
                  Edit
                </Button>

              </div>
              <div className={classes.contentBody}>

                <div className={classes.main}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      lg={6}
                      xs={12}
                    >
                      <Typography
                        className={classes.title}
                        variant="h3"
                      >
                        Program {values.title}
                      </Typography>
                      <Divider className={classes.divider} />

                      <Typography
                        className={classes.textField}
                        variant="button"
                      >
                        Type: {values.type}
                      </Typography>

                      <Typography
                        className={classes.textField}
                        variant="button"
                      >
                        Created At: {moment(values.createdAt).format('DD/MM/YYYY')}
                      </Typography>


                      {(sporter.id !== undefined) ?
                        (
                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Sporter: {sporter.user.fullName || "No sporter assigned"}
                          </Typography>
                        ) : (
                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Sporter: {"No sporter assigned"}
                          </Typography>

                        )}


                      {(sporter.id === undefined) ?
                        (

                          < AssignSporter assignSporterToTrainer={assignSporterToTrainer} sporters={[{ id: '', user: { fullName: "" }, workoutProgram: null }, ...sporters]} />
                        ) : (
                          <RemoveSporter removeSporter={removeSporter} />
                        )
                      }
                    </Grid>


                    <Grid
                      item
                      lg={12}
                      xs={12}
                    >
                      <Typography
                        className={classes.title}
                        variant="h4"
                      >

                        {values.workoutSessions.length} Workout Sessions
                            </Typography>

                      <Divider className={classes.divider} />

                      <WorkoutSessionsPreview workoutSessions={values.workoutSessions} />

                    </Grid>
                  </Grid>
                </div>

              </div>
            </div>
          </Grid>
        </Grid>
      </div >
    );
  }
}


export default withRouter(WorkoutProgramDetail);