import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'

import { SportersToolbar, SportersTable } from './components'
import mockData from './data'

//api
import { SporterService, TrainerService } from '../../services/api'
//jwt authen
import { isJWTValid, getTrainerIdFromJWT } from '../../utils/jwt'
import { filterArrayObjectByTwoKeys } from '../../utils/filter'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const UserList = () => {
  const classes = useStyles()

  const [sporters, setSporters] = useState([])
  const [filteredSporters, setFilteredSporters] = useState([])
  const [searchTerm, setSearchTerm] = useState()
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

    SporterService.getSportersByTrainer({ trainerId: trainerId })
      .then((res) => {
        console.log(res)
        setSporters(res)
      }).catch((e) => console.log('sporters not found'))
  }, [trainerId])

  useEffect(() => {
    setFilteredSporters(sporters)
  }, [sporters])


  useEffect(() => {

    let filteredArray = filterArrayObjectByTwoKeys([...sporters], searchTerm, "user.fullName", "id")
    if (filteredArray.length >= 0) {
      setFilteredSporters(filteredArray)
    }
  }, [searchTerm])

  const searchBarOnChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  return (
    <div className={classes.root}>
      <SportersToolbar searchBarOnChange={searchBarOnChange} />
      <div className={classes.content}>
        <SportersTable sporters={filteredSporters} />
      </div>
    </div>
  )
}

export default UserList
