import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { SearchInput } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';

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
          placeholder="Search by rate, confirm as seen"
          onChange={props.searchBarOnChange}
        />
        <Checkbox

          name="checkedF"
          onChange={e => {
            if (e.target.checked === true) {
              props.handleCheck()
            }else{
              props.reset()
            }
          }}

        /><Typography
          variant="body1"
        >
          Not Confirmed Only
                        </Typography>
      </div>
    </div>
  )
}

FeedbacksToolbar.propTypes = {
  className: PropTypes.string
}

export default FeedbacksToolbar
