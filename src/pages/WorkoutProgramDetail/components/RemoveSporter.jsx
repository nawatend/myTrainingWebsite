import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';


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