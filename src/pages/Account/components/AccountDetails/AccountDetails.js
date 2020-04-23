import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
//api
import { TrainerService } from '../../../../services/api';
//jwt authen
import { getTrainerIdFromJWT } from '../../../../utils/jwt';


const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();


  const [values, setValues] = useState({
    fullName: '',
    focus: '',
    email: '',
    description: '',
    gender: '',
    age: '88',
    password: '',
    confirmPassword: '',
    trainerId: '',
    userId: '',
    sporterId: '',
    imageName: 'skr_odh78c',
    goal: '',
    height: '',
    weight: '',
    role: 'trainer',

  });

  // const [trainerId, setTrainerId] = useState(null)
  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)

        setValues({
          ...values,
          userId: res.user.id,
          trainerId: res.id,
          fullName: res.user.fullName,
          email: res.user.email,
          gender: res.user.gender,
          description: res.description,
          focus: res.focus,
          age: res.user.age
        })
      }).catch((e) => console.log('trainer not found'))

  }, [])



  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSave = event => {
    event.preventDefault()

    TrainerService.updateTrainer(values)
      .then((res) => {
        console.log(res)
      }).catch(e => console.log(e))
  }

  const genders = [
    {
      value: 'female',
      label: 'Female'
    },
    {
      value: 'male',
      label: 'Male'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the full name"
                label="Full name"
                margin="dense"
                name="fullName"
                onChange={handleChange}
                required
                value={values.fullName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Focus"
                margin="dense"
                name="focus"
                onChange={handleChange}
                required
                value={values.focus}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Description"
                margin="dense"
                name="description"
                onChange={handleChange}
                type="text"
                value={values.description}
                variant="outlined"
                multiline
                rows="6"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Select Gender"
                margin="dense"
                name="gender"
                onChange={handleChange}
                required
                select
                // eslint-disable-next-line react/jsx-sort-props
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {genders.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Age"
                margin="dense"
                name="age"
                onChange={handleChange}
                required
                value={values.age}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >

              <Typography

                variant="h6"
              >
                Reset Password
            </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                required
                margin="dense"
                label="Password"
                name="password"
                onChange={handleChange}
                type="password"
                value={values.password || ''}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                required
                margin="dense"
                label="Confirm Password"
                name="confirm-password"
                onChange={handleChange}
                type="password"
                value={values.confirmPassword || ''}
                variant="outlined"
              />
            </Grid>


          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSave}
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
