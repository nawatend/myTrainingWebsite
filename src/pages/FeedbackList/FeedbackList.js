import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { FeedbackService, TrainerService } from '../../services/api'
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { FeedbacksTable, FeedbacksToolbar } from './components'
import mockData from './data'
import { filterArrayObjectByTwoKeys } from '../../utils/filter'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const FeedbackList = () => {
  const classes = useStyles()


  const [filteredFeedbacks, setFilteredFeedbacks] = useState([])
  const [searchTerm, setSearchTerm] = useState()
  const [feedbacks, setFeedbacks] = useState([])
  const [render, setRender] = useState(false)
  const [trainerId, setTrainerId] = useState()

  useEffect(() => {

    TrainerService.getTrainerByUserId(getTrainerIdFromJWT())
      .then((res) => {
        console.log("TrainerId")
        setTrainerId(res.id)
      }).catch((e) => console.log('trainer not found'))
  }, [trainerId])


  useEffect(() => {
    FeedbackService.getFeedbacksByTrainer(trainerId)
      .then((res) => {
        setFeedbacks(res)
      })
  }, [trainerId,render])

  useEffect(() => {
    setFilteredFeedbacks(feedbacks)
  }, [feedbacks])

  useEffect(() => {

    let filteredArray = filterArrayObjectByTwoKeys([...feedbacks], searchTerm, "rate.rate", "read")
    if (filteredArray.length >= 0) {
      setFilteredFeedbacks(filteredArray)
    }
  }, [searchTerm])


  const showNotConfirmed = () => {
    let filteredArray = filterArrayObjectByTwoKeys([...feedbacks], "false", "read")
    if (filteredArray.length >= 0) {
      setFilteredFeedbacks(filteredArray)
    }
  }

  const reset = () => {
    setFilteredFeedbacks(feedbacks)
  }

  const confirmFeedback = (id) => {
    FeedbackService.confirmFeedback({ feedbackId: id, read: true })
      .then((res) => {
        setRender(!render)
      })
  }

  const searchBarOnChange = (e) => {
    e.preventDefault()
    setSearchTerm(e.target.value)
  }


  return (
    <div className={classes.root}>
      <FeedbacksToolbar reset={reset} handleCheck={showNotConfirmed} searchBarOnChange={searchBarOnChange} />
      <div className={classes.content}>
        <FeedbacksTable handleConfirm={confirmFeedback} Feedbacks={filteredFeedbacks} />
      </div>
    </div>
  )
}

export default FeedbackList
