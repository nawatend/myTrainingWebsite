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
import { SporterService, TrainerService } from '../../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../../utils/jwt'

const useStyles = makeStyles(theme => ({
  assignBox: {
    margin: theme.spacing(2, 0)
  },
  textField: {
    marginTop: theme.spacing(2)
  }
}))


const RemoveSporter = props => {

  const classes = useStyles()



  return (
    <div className={classes.assignBox} >
      <Button
        className={classes.signUpButton}
        color="primary"
        //disabled={!values.isValid}

        size="large"
        type="submit"
        variant="outlined"
        onClick={props.removeSporter}
      >
        Remove Sporter
          </Button>

    </div>
  )
}

export default RemoveSporter