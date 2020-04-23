import { Divider, Drawer } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FeedbackIcon from '@material-ui/icons/Feedback';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Profile, SidebarNav } from './components';


const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Athletes',
      href: '/sporters',
      icon: <PeopleIcon />
    },
    {
      title: 'Workout Sessions',
      href: '/workoutsessions',
      icon: <AssignmentIcon />
    },
    {
      title: 'Workout Programs',
      href: '/workoutprograms',
      icon: <AssignmentIcon />
    },
    {
      title: 'W. Program Templates',
      href: '/templates',
      icon: <AssignmentIcon />
    },
    {
      title: 'Exercises',
      href: '/exercises',
      icon: <AccessibilityNewIcon />
    },
    {
      title: 'Feedbacks',
      href: '/feedbacks',
      icon: <FeedbackIcon />
    },

    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Logout',
      href: '/sign-out',
      icon: <LockOpenIcon />
    },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }, {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },

  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
