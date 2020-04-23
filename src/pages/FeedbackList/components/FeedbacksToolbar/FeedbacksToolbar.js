import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { SearchInput } from 'components'
import PropTypes from 'prop-types'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}))

const FeedbacksToolbar = props => {
  const { className, ...rest } = props

  const classes = useStyles()

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
       <span className={classes.spacer} />
      <Typography
        className={classes.title}
        variant="h3"
      >
        Feedbacks
                      </Typography>
                      
      
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search by name, rating"
        />
      </div>
    </div>
  )
}

FeedbacksToolbar.propTypes = {
  className: PropTypes.string
}

export default FeedbacksToolbar
