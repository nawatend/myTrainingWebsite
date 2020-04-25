import { Button, Divider, Grid, IconButton, Typography, TextField } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import { CloudinaryContext, Image } from "cloudinary-react";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams, withRouter } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

//api
import { SporterService, ProgressService } from '../../services/api';
import { getDayNumber, getWeekNumber } from '../../utils/getDayNumber';
import { getUserIdFromJWT } from '../../utils/jwt';

//chart
import Chart from './Chart';

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

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  type: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 64
    }
  },

  // password: {
  //     presence: { allowEmpty: false, message: 'is required' },
  //     length: {
  //         maximum: 128
  //     }
  // },
  // policy: {
  //     presence: { allowEmpty: false, message: 'is required' },
  //     checked: true
  // }
};

let SporterDetail = (props) => {
  const { history } = props;
  const { id } = useParams()

  const classes = useStyles();

  const [isAuth, setIsAuth] = useState(true)
  const [loading, setLoading] = useState(true)

  const [values, setValues] = useState({
    id: -1,
    title: 'Exercise not found!',
    type: '',
    imageName: '',
    videoName: '',
    cardioLevel: 0,
    muscleLevel: 0,
    description: '',
    trainerId: '-',
    user: {}
  })

  const [exerciseBase, setExerciseBase] = useState({})
  const [exerciseBaseId, setExerciseBaseId] = useState(0)
  const [chartType, setChartType] = useState("day")

  const [exerciseBases, setExerciseBases] = useState([])

  const [progresses, setProgresses] = useState([])
  const [sporter, setSporter] = useState({})

  const [currentProgresses, setCurrentProgresses] = useState([])

  //datas
  const [dayData, setDayData] = useState(Array(getDayNumber(new Date())).fill(0))
  const [weekData, setWeekData] = useState(Array(getWeekNumber(new Date()) + 1).fill(0))
  const [monthData, setMonthData] = useState(Array(new Date().getMonth() + 1).fill(0))
  const [yearData, setYearData] = useState(Array(5).fill(0))


  useEffect(() => {
    if (loading) {
      SporterService.getSporterById(id)
        .then((res) => {
          setValues({ ...values, ...res, trainerId: res.trainer.id })
          setSporter(res)
          console.log(res)
        }).catch(error => {
          console.log(error)
          history.push('/sporters')
        })
    }
  }, [])

  useEffect(() => {
    ProgressService.getProgressesBySporter(sporter.id)
      .then((res) => {
        console.log(res)
        setProgresses([...res])
      })
  }, [sporter.id])


  useEffect(() => {
    let EBs = []
    if (progresses.length >= 1) {
      progresses.forEach(progress => {
        //push unique
        if (EBs.find(eb => eb.id === progress.exerciseFull.exerciseBase.id) === undefined) {
          EBs.push(progress.exerciseFull.exerciseBase)
        }
      });
    }
    setExerciseBases(EBs)
    setLoading(false)
  }, [progresses, progresses.length])

  useEffect(() => {
    setExerciseBase({ ...exerciseBases[0] })
  }, [exerciseBases])
  useEffect(() => {
    let filter = progresses.filter((progress) => {
      return progress.exerciseFull.exerciseBase.id === exerciseBase.id
    })
    setCurrentProgresses(filter)
  }, [exerciseBase.id, progresses])



  useEffect(() => {
    let updateDays = Array(getDayNumber(new Date())).fill(0)
    currentProgresses.forEach(cp => {
      if (exerciseBase.type === "time") {
        updateDays[getDayNumber(cp.createdAt) - 1] = cp.time
      } else {
        updateDays[getDayNumber(cp.createdAt) - 1] = cp.kg
      }
    })

    //let updatedDays = [...dayData]
    let updateWeek = [...weekData]
    const step = 6


    weekData.forEach((w, i) => {
      let weekTot = 0
      //     console.log("Week", i)
      //    console.log(i * 7 + " - " + (i * 7 + step))
      for (let n = i * 7; n <= (i * 7 + step); n++) {

        weekTot += (updateDays[n]) ? updateDays[n] : 0
      }
      updateWeek[i] = parseInt(weekTot / currentProgresses.length)
      weekTot = 0
    })
    //console.log(updateWeek)

    let goodWeek = [...updateWeek].slice(1, updateWeek.length)
    let updateMonth = [...monthData]
    const monthStep = 3

    monthData.forEach((m, i) => {
      //console.log("month", i)
      let monthTot = 0
      //console.log(i * 4 + " - " + (i * 4 + monthStep))
      for (let n = i * 4; n <= (i * 4 + monthStep); n++) {
        monthTot += (goodWeek[n]) ? goodWeek[n] : 0
      }
      updateMonth[i] = parseInt(monthTot / currentProgresses.length)
      monthTot = 0
    })
    let updateYear = [...yearData]


    yearData.forEach((m, i) => {
      //console.log("month", i)
      let yearTot = 0
      //console.log(i * 4 + " - " + (i * 4 + monthStep))
      for (let n = 0; n <= updateMonth.length; n++) {
        yearTot += (updateMonth[n]) ? updateMonth[n] : 0
      }
      updateYear[i] = parseInt(yearTot / currentProgresses.length)
      yearTot = 0
    })
    console.log(updateMonth)
    console.log(updateYear)


    setYearData(updateYear)
    setMonthData(updateMonth)
    setWeekData(updateWeek)
    setDayData(updateDays)
  }, [currentProgresses])




























  const handleChange = event => {

    setExerciseBaseId(event.target.value)
    setExerciseBase({ ...exerciseBases[event.target.value] })
  };
















  const handleEdit = () => {
    history.push('/sporters/edit/' + id)
  };

  const handleBack = () => {
    history.goBack();
  };

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
                  Remove
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
                      lg={12}
                      xs={12}
                    >

                      <Typography
                        className={classes.title}
                        variant="h3"
                      >
                        {values.user.fullName}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Grid
                        container

                      >
                        <Grid
                          item
                          lg={6}
                          xs={12}
                        >
                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Goal: {values.goal}
                          </Typography>

                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Weight: {values.weight} kg
                      </Typography>

                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Height: {values.height} cm
                      </Typography>

                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Days Trained: {values.daysTrained}
                          </Typography>
                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Days Trained Streak:{values.daysTrainedStreak}
                          </Typography>

                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            Joined: {moment(values.user.createdAt).format('DD/MM/YYYY')}
                          </Typography>

                          <Typography
                            className={classes.textField}
                            variant="button"
                          >
                            E-mail: {values.user.email}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          lg={4}
                          xs={12}
                        >
                          <CloudinaryContext cloudName="filesmytraining">
                            <Image
                              className={classes.image}

                              publicId={values.user.imageName}
                              fetch-format="auto"
                              quality="auto"
                            />

                          </CloudinaryContext>
                        </Grid>
                      </Grid>
                    </Grid>


                    <Grid
                      item
                      lg={7}
                      xs={12}
                    >
                      <Typography
                        className={classes.title}
                        variant="h4"
                      >
                        Progresses
                            </Typography>
                      <Divider className={classes.divider} />

                      <TextField
                        className={classes.textField}
                        fullWidth
                        label="Select Exercise"
                        margin="dense"
                        name="exerciseBaseId"
                        onChange={handleChange}
                        select
                        // eslint-disable-next-line react/jsx-sort-props
                        SelectProps={{ native: true }}
                        value={exerciseBaseId ? exerciseBaseId : 0}
                        variant="outlined"
                      >
                        {exerciseBases.map((option, id) => (
                          <option
                            key={id}
                            value={id}
                          >
                            {option.title}
                          </option>
                        ))}
                      </TextField>

                      {exerciseBase.type !== "time" ?
                        (<Chart labelType={chartType} name={exerciseBase.title + ": " + currentProgresses.length + " times"} color="#0F4C75" averageName="Average Kg" data={{ day: [...dayData], week: [...weekData], month: [...monthData], year: [...yearData] }} />)
                        :
                        (<Chart labelType={chartType} name={exerciseBase.title + " " + currentProgresses.length + " times"} color="#0F4C75" averageName="Average Minutes" data={{ day: [...dayData], week: [...weekData], month: [...monthData], year: [...yearData] }} />)
                      }
                      {/* -------------------------------------------------------------------------------------------end Progreesss */}

                      <Typography
                        className={classes.textField}
                        variant="h6"
                      >

                      </Typography>

                      <Typography
                        className={classes.textField}
                        variant="body1"
                      >
                        {values.description}
                      </Typography>
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


export default withRouter(SporterDetail);