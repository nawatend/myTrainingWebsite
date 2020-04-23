import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
//api
import { SporterService, TrainerService } from '../../services/api'
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { SportersTable, SportersToolbar } from './components'



const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const SporterList = () => {
  const classes = useStyles()

  const [sporters, setSporters] = useState([])
  const [inviteTimes, setInviteTimes] = useState(0)
  //const [sporters] = useState(mockData)
  const [trainerId, setTrainerId] = useState(null)
  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))

  }, [trainerId])

  useEffect(() => {

    SporterService.getSporters()
      .then((res) => {
        console.log(res)
        setSporters(res)
      }).catch((e) => console.log('sporters not found'))

  }, [inviteTimes])

  const changeInvite = () =>{
    
    setInviteTimes(inviteTimes + 1)
  }

  return (
    <div className={classes.root}>
      <SportersToolbar />
      <div className={classes.content}>
        <SportersTable trainerId={trainerId} sporters={sporters} onChange={changeInvite} />
      </div>
    </div>
  )
}

export default SporterList
