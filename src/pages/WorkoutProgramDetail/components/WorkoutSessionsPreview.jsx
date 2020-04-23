import { Button, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloudinaryContext, Image } from "cloudinary-react";
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';


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
    marginBottom: theme.spacing(4)
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1)
  },
  textField: {
    marginTop: theme.spacing(1),
    display: 'block'
  },
  textField__sub: {
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


export default function WorkoutSessionsPreview(props) {

  const history = useHistory()
  const classes = useStyles();

  return (
    <div>

      {props.workoutSessions.map(workoutSession => (

        <Grid
          key={workoutSession.id}
          container
          spacing={3}
        >
          <Grid
            item
            lg={5}
            xs={12}
          >
            <Typography
              className={classes.textField__sub}
              variant="h4"
            >
              {workoutSession.title}
            </Typography>

            <Typography
              className={classes.textField}
              variant="subtitle1"
            >
              Type: {workoutSession.type}
            </Typography>

            <Typography
              className={classes.textField}
              variant="subtitle1"
            >
              Cardio Level: {workoutSession.cardioLevel}
            </Typography>
            <Typography
              className={classes.textField}
              variant="subtitle1"
            >
              Muscle Level: {workoutSession.muscleLevel}
            </Typography>

            <Typography
              className={classes.textField}
              variant="subtitle1"
            >
              Created At: {moment(workoutSession.createdAt).format('DD/MM/YYYY')}
            </Typography>


            <Button
              color="primary"
              variant="outlined"
              className={classes.textField}
              onClick={(e) => {
                e.preventDefault()

                history.push('/workoutsessions/detail/' + workoutSession.id)

              }}
            >
              More Info
                </Button>
          </Grid>
          <Grid
            item
            lg={6}
            xs={12}
          >
            <CloudinaryContext cloudName="filesmytraining">
              <Image
                className={classes.image}
                publicId={workoutSession.imageName}
                fetch-format="auto"
                quality="auto"
              />
            </CloudinaryContext>
          </Grid>

          {/* <Grid
            item
            lg={6}
            xs={12}
          >
            <Typography
              className={classes.title}
              variant="h6"
            >
              Description
              </Typography>
            <Typography
              className={classes.textField}
              variant="body1"
            >
              {exerciseFull.description}
            </Typography>
          </Grid> */}



          < Grid
            item
            xs={12}
          >
            <Divider className={classes.divider} />
          </Grid>

        </Grid >


      ))
      }

    </div >
  )
}
