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

const UsersToolbar = props => {
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
        Invite Athletes
                      </Typography>
      {/* <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
        <Button
          color="primary"
          variant="contained"
        >
          Add user
        </Button>
      </div> */}
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
        />
      </div>
    </div>
  )
}

UsersToolbar.propTypes = {
  className: PropTypes.string
}

export default UsersToolbar
