import { Avatar, Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { getInitials } from 'helpers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';
import { SporterService } from 'services/api';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },

}));

const SportersTable = props => {
  const { className, sporters, ...rest } = props;

  const classes = useStyles();
  const history = useHistory()
  const [selectedSporters, setSelectedSporters] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [render, setRender] = useState(false)


  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };



  const sendInvite = (e, sporterId) => {
    e.preventDefault()
    let body = {
      sporterId: sporterId,
      trainerId: props.trainerId,
      acceptTrainer: false,
    }

    console.log(body)
    SporterService.inviteByTrainer(body)
      .then((res) => {
        props.onChange()
      }).catch((e) => console.log('failed sent invite'))


  }

  const cancelInvite = (e, sporterId) => {

    e.preventDefault()
    let body = {
      sporterId: sporterId,
      trainerId: null,
      acceptTrainer: false,
    }

    console.log(body)
    SporterService.inviteByTrainer(body)
      .then((res) => {
        props.onChange()
      }).catch((e) => console.log('failed cancel invite'))

  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>

                  <TableCell>ID</TableCell>
                  <TableCell>Full name</TableCell>
                  <TableCell>Goal</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sporters.slice(0, rowsPerPage).map(sporter => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={sporter.id}
                    selected={selectedSporters.indexOf(sporter.id) !== -1}
                    onChange={(e) => console.log('changed')}
                  >

                    <TableCell>{sporter.id}</TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={`http://res.cloudinary.com/filesmytraining/image/upload/f_auto,q_auto/v1/${sporter.user.imageName}`}
                        >
                          {getInitials(sporter.user.fullName)}
                        </Avatar>
                        <Typography variant="body1">{sporter.user.fullName}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{sporter.goal}</TableCell>
                    <TableCell>

                      {(sporter.trainer === null) ?
                        (
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={(e) => sendInvite(e, sporter.id)}
                          >
                            SEND INVITE
                          </Button>

                        ) : (<Button
                          color="primary"
                          variant="text"
                          onClick={(e) => cancelInvite(e, sporter.id)}
                        >
                          CANCEL INVITE
                        </Button>)}



                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={sporters.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

SportersTable.propTypes = {
  className: PropTypes.string,
  sporters: PropTypes.array.isRequired
};

export default SportersTable;
