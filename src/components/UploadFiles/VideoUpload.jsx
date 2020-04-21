import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

import { fetchPhotos, openUploadWidget } from "../../services/cloudinary";
import { CloudinaryContext, Video, Transformation } from "cloudinary-react";

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {

    margin: theme.spacing(2, 0)
  },
  input: {
    display: 'none',
  }, image: {
    margin: theme.spacing(2, 0),
    width: '100%',
    borderWidth: '1px',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderRadius: '4px'
  },
}));
let VideoUpload = (props) => {

  const { className, ...rest } = props;

  const [completedUpload, setCompletedUpload] = useState(0)
  const [video, setVideo] = useState()
  const classes = useStyles();



  useEffect(() => {
    if (props.video !== '') {
      setCompletedUpload(100)
      setVideo(props.video)
    }

  }, [props.video])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "filesmytraining",
      tags: [tag],
      uploadPreset: "file_mt_",
      folder: 'videos',
      multiple: false
    };

    openUploadWidget(uploadOptions, (error, medias) => {
      if (!error) {
        console.log(medias);
        if (medias.event === 'success') {
          props.onChange(medias.info.public_id)
          setVideo(medias.info.public_id)
        }
      } else {
        console.log(error);
      }
    })
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={2} >
        <Grid
          item
          md={12}
          xs={12}
        >
          <label htmlFor="contained-button-file">
            <Button onClick={() => beginUpload()} variant="text" color="primary" component="span" className={classes.uploadButton}>
              Upload Exercise Video *
            </Button>
            <LinearProgress variant="determinate" value={completedUpload} />
          </label>
        </Grid>
        {/* show preview */}
        <Grid
          item
          md={12}
          xs={12}
        >
          <CloudinaryContext cloudName="filesmytraining">

          {video !== undefined && 
            <Video key={video} className={classes.image} controls={true} cloudName="filesmytraining" publicId={video}>
            </Video>
          }

          </CloudinaryContext>
        </Grid>
      </Grid>
    </div>
  )
}
export default VideoUpload