import { Avatar, Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { getInitials } from 'helpers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';


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
  }
}));

const FeedbacksTable = props => {
  const { className, Feedbacks, ...rest } = props;

  const classes = useStyles();

  const [selectedFeedbacks, setSelectedFeedbacks] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { Feedbacks } = props;

    let selectedFeedbacks;

    if (event.target.checked) {
      selectedFeedbacks = Feedbacks.map(user => user.id);
    } else {
      selectedFeedbacks = [];
    }

    setSelectedFeedbacks(selectedFeedbacks);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedFeedbacks.indexOf(id);
    let newSelectedFeedbacks = [];

    if (selectedIndex === -1) {
      newSelectedFeedbacks = newSelectedFeedbacks.concat(selectedFeedbacks, id);
    } else if (selectedIndex === 0) {
      newSelectedFeedbacks = newSelectedFeedbacks.concat(selectedFeedbacks.slice(1));
    } else if (selectedIndex === selectedFeedbacks.length - 1) {
      newSelectedFeedbacks = newSelectedFeedbacks.concat(selectedFeedbacks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedFeedbacks = newSelectedFeedbacks.concat(
        selectedFeedbacks.slice(0, selectedIndex),
        selectedFeedbacks.slice(selectedIndex + 1)
      );
    }

    setSelectedFeedbacks(newSelectedFeedbacks);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

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
                  <TableCell>Sporter name</TableCell>
                  <TableCell>Workout session title</TableCell>
                  <TableCell>Rate</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell>Confirm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Feedbacks.slice(0, rowsPerPage).map(feedback => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={feedback.id}
                    onClick={() => console.log('clicked ' + feedback.id)}
                    selected={selectedFeedbacks.indexOf(feedback.id) !== -1}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={`http://res.cloudinary.com/filesmytraining/image/upload/f_auto,q_auto/v1/${feedback.rate.sporter.user.imageName}`}
                        >
                          {getInitials(feedback.rate.sporter.user.fullName)}
                        </Avatar>
                        <Typography variant="body1">{feedback.rate.sporter.user.fullName}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{feedback.rate.workoutSession.title}</TableCell>
                    <TableCell>
                      {feedback.rate.rate} stars
                    </TableCell>
                    <TableCell>{feedback.message}</TableCell>
                    <TableCell>
                      {moment(feedback.createdAt).format('DD/MM/YYYY')}
                    </TableCell>

                    <TableCell><Button
                      color="primary"
                      variant="contained"
                      onClick={() => { console.log("read") }}
                    >
                      READ
                  </Button>
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
          count={Feedbacks.length}
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

FeedbacksTable.propTypes = {
  className: PropTypes.string,
  Feedbacks: PropTypes.array.isRequired
};

export default FeedbacksTable;
