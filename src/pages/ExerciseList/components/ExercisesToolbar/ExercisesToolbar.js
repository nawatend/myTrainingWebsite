import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

import { SearchInput } from 'components'
import { useHistory } from 'react-router-dom';

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

  const history = useHistory()
  const classes = useStyles()

  const handleAdd = (e) => {
   
    history.push("/exercises/create")
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
          Add exercise
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search exercise by title or type"
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