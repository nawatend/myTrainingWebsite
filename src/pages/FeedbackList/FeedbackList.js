import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { FeedbackService, TrainerService } from '../../services/api'
//jwt authen
import { getTrainerIdFromJWT } from '../../utils/jwt'
import { FeedbacksTable, FeedbacksToolbar } from './components'
import mockData from './data'



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

  const [Feedbacks] = useState(mockData)

  const [feedbacks, setFeedbacks] = useState([])
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
        console.log(res)
        setFeedbacks(res)
      })

  }, [trainerId])

  return (
    <div className={classes.root}>
      <FeedbacksToolbar />
      <div className={classes.content}>
        <FeedbacksTable Feedbacks={feedbacks} />
      </div>
    </div>
  )
}

export default FeedbackList
