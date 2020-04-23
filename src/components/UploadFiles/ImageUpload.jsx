import { Button, Grid, LinearProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CloudinaryContext, Image } from "cloudinary-react";
import React, { useEffect, useState } from 'react';
import { openUploadWidget } from "../../services/cloudinary";


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
let ImageUpload = (props) => {

  const { className, ...rest } = props;

  const [completedUpload, setCompletedUpload] = useState(0)
  const [image, setImage] = useState()
  const classes = useStyles();



  useEffect(() => {
    if (props.image !== '') {
      setCompletedUpload(100)
      setImage(props.image)
    }

  }, [props.image])

  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: "filesmytraining",
      tags: [tag],
      uploadPreset: "file_mt_",
      folder: 'images',
      multiple: false,
      cropping: true,
      croppingAspectRatio: 1.65,
      showSkipCropButton: false
    };

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos);
        if (photos.event === 'success') {
          props.onChange(photos.info.public_id)
          setImage(photos.info.public_id)
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
          {/* <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => handleFiles(e.target.files)}
          /> */}
          <label htmlFor="contained-button-file">
            <Button onClick={() => beginUpload()} variant="text" color="primary" component="span" className={classes.uploadButton}>
              Upload Cover Image *
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
            {image !== undefined &&
              <Image
                className={classes.image}
                key={image}
                publicId={image}
                fetch-format="auto"
                quality="auto"
              />
            }

          </CloudinaryContext>
        </Grid>
      </Grid>
    </div>
  )
}
export default ImageUpload