import { Avatar, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { getInitials } from 'helpers';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useHistory } from 'react-router-dom';

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

const SportersTable = props => {
  const { className, sporters, ...rest } = props;

  const classes = useStyles();
  const history = useHistory()
  const [selectedSporters, setSelectedSporters] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { sporters } = props;

    let selectedSporters;

    if (event.target.checked) {
      selectedSporters = sporters.map(sporter => sporter.id);
    } else {
      selectedSporters = [];
    }

    setSelectedSporters(selectedSporters);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSporters.indexOf(id);
    let newSelectedSporters = [];

    if (selectedIndex === -1) {
      newSelectedSporters = newSelectedSporters.concat(selectedSporters, id);
    } else if (selectedIndex === 0) {
      newSelectedSporters = newSelectedSporters.concat(selectedSporters.slice(1));
    } else if (selectedIndex === selectedSporters.length - 1) {
      newSelectedSporters = newSelectedSporters.concat(selectedSporters.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSporters = newSelectedSporters.concat(
        selectedSporters.slice(0, selectedIndex),
        selectedSporters.slice(selectedIndex + 1)
      );
    }

    setSelectedSporters(newSelectedSporters);
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

                  <TableCell>ID</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Days trained</TableCell>
                  <TableCell>Goal</TableCell>
                  <TableCell>Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sporters.slice(0, rowsPerPage).map(sporter => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={sporter.id}
                    onClick={(e) => {
                      e.preventDefault()
                      history.push('/sporters/detail/' + sporter.id)
                    }}
                    selected={selectedSporters.indexOf(sporter.id) !== -1}
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
                    <TableCell>{sporter.user.email}</TableCell>
                    <TableCell>
                      {sporter.user.age}
                    </TableCell>
                    <TableCell>{sporter.daysTrained}</TableCell>
                    <TableCell>{sporter.goal}</TableCell>
                    <TableCell>
                      {moment(sporter.createdAt).format('DD/MM/YYYY')}
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
