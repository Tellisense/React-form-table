import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { useUser } from '../context/UserProvider'
import { useHistory } from 'react-router-dom';
import Copyright from '../components/Copyright'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const user = useUser()
  const history = useHistory();

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })


  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // fetch API
    try {
      const response = await fetch('http://localhost:1337/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          identifier: loginData.email,
          password: loginData.password,
        })
      })
      const data = await response.json()
      user.setCurrentUser(data.user.email)
      localStorage.setItem('token', data.jwt);
      setLoginData({
        email: '',
        password: ''
      })
      history.replace("/");

      console.log(data)

    } catch (error) {
      console.log(`the error you are getting: `, error)
    }






    // Axios
    // try {
    //   const { data } = await axios.post('http://localhost:1337/auth/local', {
    //     identifier: loginData.email,
    //     password: loginData.password,
    //   });
    //   console.log(`data:`, data)
    //   user.setCurrentUser(data.user.email)
    //   localStorage.setItem('token', data.jwt);
    //   setLoginData({
    //     email: '',
    //     password: ''
    //   })
    //   history.replace("/");

    // } catch (ex) {
    //   console.log(ex)
    // }


    //response of the api call will save user into context

    // route the form to the main
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={FormData.email}
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={FormData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/request-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


export default LoginPage