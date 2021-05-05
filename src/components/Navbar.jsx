import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useUser } from '../context/UserProvider'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '3rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar({ children }) {
  const classes = useStyles();
  const user = useUser()



  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {children}
        </Toolbar>
        <div>Logged in as: {user.currentUser}</div>
      </AppBar>
    </div>
  );
}






