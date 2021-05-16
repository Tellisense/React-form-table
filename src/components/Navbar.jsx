import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Switch as ThemeToggle } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import EmailSent from "./EmailSent";
import LoginPage from "../views/LoginPage";
import PasswordRequestPage from "../views/PasswordRequestPage";
import PasswordResetPage from "../views/PasswordResetPage";
import RegisterPage from "../views/RegisterPage";
import Topics from "./Topics";
import LoginDropdown from './LoginDropdown'
import { useUser } from '../context/UserProvider'
import { Link } from "@material-ui/core";
import { useTheme } from '../context/ThemeProvider'
import MainPage from '../views/MainPage'
import ConfirmRegistration from '../views/ConfirmRegistration';
import {
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '3rem'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  link: {
    color: "white",
    marginRight: "1rem",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const user = useUser()
  console.log(`user: `, user)
  const theme = useTheme()


  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.nav}>
          <nav>
            <Link className={classes.link} component={RouterLink} to='/'>
              Table
              </Link>
            <Link
              className={classes.link}
              component={RouterLink}
              to='/topics'
            >
              Topics
              </Link>
            {user?.currentUser ? <LoginDropdown /> : (<Link className={classes.link} component={RouterLink} to='/login'>
              Login
            </Link>)}

            <ThemeToggle
              label="Theme: "
              labelPlacement="top"
              checked={theme.darkMode}
              onChange={props.changeTheme}
            />
          </nav>

        </Toolbar>

      </AppBar>
      <Switch>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/request-password'>
          <PasswordRequestPage />
        </Route>
        <Route path='/reset-password'>
          <PasswordResetPage />
        </Route>
        <Route path='/email-sent'>
          <EmailSent />
        </Route>
        <Route path='/topics'>
          <Topics />
        </Route>
        <Route path='/confirm-registration'>
          <ConfirmRegistration />
        </Route>
        <Route path='/'>
          <MainPage />
        </Route>
      </Switch>
    </>

  );
}






