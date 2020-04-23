import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import { SearchInput } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router-dom'


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

  const history = useHistory()
  const handleAdd = (e) => {
   
    history.push("/invite/sporters")
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleAdd}
        >
          INVITE ATHLETE
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search athletes by name or id"
          onChange={props.searchBarOnChange}
        />
      </div>
    </div>
  )
}

UsersToolbar.propTypes = {
  className: PropTypes.string
}

export default UsersToolbar
