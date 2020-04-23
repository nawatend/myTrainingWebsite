import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';


const useStyles = makeStyles(theme => ({
  assignBox: {
    margin: theme.spacing(2, 0)
  },
  textField: {
    marginTop: theme.spacing(2)
  }
}))



const AssignSporter = props => {


  const classes = useStyles()

  const [values, setValues] = useState({
    trainerId: '-',
    sporterId: ''
  })

  const handleChange = event => {
    event.persist();

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };




  return (
    <div className={classes.assignBox} >
      <Typography
        variant="h4"
      >
        Assign sporter
              </Typography>

      <TextField
        className={classes.textField}
        fullWidth
        label="Select Sporter"
        margin="dense"
        name="sporterId"
        onChange={handleChange}
        required
        select
        // eslint-disable-next-line react/jsx-sort-props
        SelectProps={{ native: true }}
        value={values.sporterId}
        variant="outlined"
      >
        {props.sporters.map(sporter => {

          if (sporter.workoutProgram === null) {

            return (
              <option
                key={sporter.id}
                value={sporter.id}
              >
                {sporter.user.fullName}
              </option>
            )
          }
        })}
      </TextField>

      <Button
        className={classes.signUpButton}
        color="primary"
        //disabled={!values.isValid}

        size="large"
        type="submit"
        variant="outlined"
        onClick={(e) => props.assignSporterToTrainer(e, parseInt(values.sporterId))}
      >
        Add
          </Button>

    </div>
  )
}

export default AssignSporter