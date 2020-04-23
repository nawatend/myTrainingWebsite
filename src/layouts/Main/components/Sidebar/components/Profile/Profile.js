import React, {useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
//api
import { ExerciseBaseService, TrainerService } from '../../../../../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../../../../../utils/jwt'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [trainer, setTrainer] = useState({user:{}})
  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)

        setTrainer(res)
      }).catch((e) => console.log('trainer not found'))

  }, [])


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt={trainer.user.fullName}
        className={classes.avatar}
        component={RouterLink}
        src={`http://res.cloudinary.com/filesmytraining/image/upload/f_auto,q_auto/v1/${trainer.user.imageName}`}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {trainer.user.fullName}
      </Typography>
      <Typography variant="body2">{trainer.focus}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
