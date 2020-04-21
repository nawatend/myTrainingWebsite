import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import { CloudinaryContext, Image } from "cloudinary-react";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer'
  },
  imageContainer: {
    height: 200,
    width: '100%',
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    backgroundSize: 'cover'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const WorkoutSessionCard = props => {
  const { className, workoutSession, ...rest } = props;
  const history = useHistory()
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}

    >
      <CardContent onClick={(e) => {
        e.preventDefault()
        history.push('/workoutsessions/detail/' + workoutSession.id)
      }}>
        <div className={classes.imageContainer}>
          <CloudinaryContext cloudName="filesmytraining">

            <Image
              alt="WorkoutSession"
              className={classes.image}
              key={workoutSession.id}
              publicId={workoutSession.imageName}
              fetch-format="auto"
              quality="auto"
            />

          </CloudinaryContext>

        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {workoutSession.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {workoutSession.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {moment(workoutSession.createdAt).format('DD/MM/YYYY')}
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            {/* <GetAppIcon className={classes.statsIcon} /> */}
            <Typography
              display="inline"
              variant="body2"
            >
              Focus: {workoutSession.type} 
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

WorkoutSessionCard.propTypes = {
  className: PropTypes.string,
  workoutSession: PropTypes.object.isRequired
};

export default WorkoutSessionCard;
