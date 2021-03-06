import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
//api
import { ExerciseBaseService, TrainerService } from '../../services/api'
import { filterArrayObjectByTwoKeys } from '../../utils/filter'
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { ExercisesTable, ExercisesToolbar } from './components'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const ExerciseList = () => {
  const classes = useStyles()

  const [filteredExercises, setFilteredExercises] = useState([])
  const [exercises, setExercises] = useState([])
  const [searchTerm, setSearchTerm] = useState()

  const [trainerId, setTrainerId] = useState(null)
  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log(res)
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))

  }, [trainerId])

  useEffect(() => {
    if (trainerId !== null) {
      ExerciseBaseService.getExerciseBasesByTrainer(trainerId)
        .then((res) => {
          console.log(res)
          setExercises(res)
        }).catch((e) => console.log('exercises not found'))
    }
  }, [trainerId])


  useEffect(() => {
    setFilteredExercises(exercises)
  }, [exercises])


  useEffect(() => {

    let filteredArray = filterArrayObjectByTwoKeys([...exercises], searchTerm, "title","type")
    if (filteredArray.length >= 0) {
      setFilteredExercises(filteredArray)
    }
  }, [searchTerm])

  const searchBarOnChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }
  return (
    <div className={classes.root}>
      <ExercisesToolbar searchBarOnChange={searchBarOnChange} />
      <div className={classes.content}>
        <ExercisesTable exercises={filteredExercises} />
      </div>
    </div>
  )
}

export default ExerciseList
