import { Button, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/styles';
import { CloudinaryContext, Image } from "cloudinary-react";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Redirect, useParams, withRouter } from 'react-router-dom';
//api
import { SporterService } from '../../services/api';



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

let ExerciseDetail = (props) => {
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

  useEffect(() => {
    if (loading) {
      SporterService.getSporterById(id)
        .then((res) => {
          setValues({ ...values, ...res, trainerId: res.trainer.id })
          setLoading(false)
          console.log(res)
        }).catch(error => {
          console.log(error)
          history.push('/sporters')
        })
    }
  }, [])

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
                          lg={6}
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
                      lg={12}
                      xs={12}
                    >
                      <Typography
                        className={classes.title}
                        variant="h4"
                      >
                        Progresses
                            </Typography>
                      <Divider className={classes.divider} />
                      <Typography
                        className={classes.textField}
                        variant="body1"
                      >
                        {values.description}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      lg={6}
                      xs={12}
                    >
                      <Typography
                        className={classes.title}
                        variant="h4"
                      >

                        Exercise Thumbnail
                            </Typography>
                      <Divider className={classes.divider} />
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


export default withRouter(ExerciseDetail);