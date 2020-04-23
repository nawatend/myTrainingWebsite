import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
//api
import { TrainerService, WorkoutProgramService } from '../../services/api'
import { filterArrayObjectByTwoKeys } from '../../utils/filter'
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { WorkoutProgramTable, WorkoutProgramToolbar } from './components'


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

  const [workoutPrograms, setWorkoutPrograms] = useState([])
  const [filteredWPs, setFilteredWPs] = useState([])
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


      WorkoutProgramService.getWorkoutProgramsByTrainer(trainerId)
        .then((res) => {
          console.log(res)
          setWorkoutPrograms(res)
        }).catch((e) => console.log('workoutPrograms not found'))
    }
  }, [trainerId])

  useEffect(() => {
    setFilteredWPs(workoutPrograms)
  }, [workoutPrograms])


  useEffect(() => {

    let filteredArray = filterArrayObjectByTwoKeys([...workoutPrograms], searchTerm, "title","type")
    if (filteredArray.length >= 0) {
      setFilteredWPs(filteredArray)
    }
  }, [searchTerm])

  const searchBarOnChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  return (
    <div className={classes.root}>
      <WorkoutProgramToolbar searchBarOnChange={searchBarOnChange} />
      <div className={classes.content}>
        <WorkoutProgramTable workoutPrograms={filteredWPs} />
      </div>
    </div>
  )
}

export default ExerciseList
