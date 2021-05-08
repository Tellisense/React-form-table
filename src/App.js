import { makeStyles } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

import React, { useEffect, useState } from "react";

import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import Container from "./components/Container";
import EmailSent from "./components/EmailSent";
import Form from "./components/Form";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PasswordRequest from "./components/PasswordRequest";
import PasswordReset from "./components/PasswordReset";
import Register from "./components/Register";
import Table from "./components/Table";
import Topics from "./components/Topics";
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "4rem",
  },
  link: {
    color: "white",
    marginRight: "1rem",
  },
}));

function App() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    try {
      const api = async () => {
        const { data } = await axios.get("http://localhost:1337/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTableData(data);
        console.log(data);
      };
      api();
    } catch (error) {
      console.log(error);
    }
  }, [callApi]);

  const renderApi = () => {
    console.log(`renderAPI called`);
    setCallApi(!callApi);
  };

  return (
    <Container className={classes.container}>
      <Router>
        <Navbar>
          <div className={classes.nav}>
            <nav>
              <Link className={classes.link} component={RouterLink} to='/'>
                Table
              </Link>

              <Link className={classes.link} component={RouterLink} to='/login'>
                Login
              </Link>

              <Link className={classes.link} component={RouterLink} to='/users'>
                Users
              </Link>

              <Link
                className={classes.link}
                component={RouterLink}
                to='/topics'
              >
                Topics
              </Link>
            </nav>
          </div>
        </Navbar>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/request-password'>
            <PasswordRequest />
          </Route>
          <Route path='/reset-password'>
            <PasswordReset />
          </Route>
          <Route path='/email-sent'>
            <EmailSent />
          </Route>
          <Route path='/topics'>
            <Topics />
          </Route>
          <Route path='/'>
            <Form
              setCounter={setCounter}
              counter={counter}
              renderApi={renderApi}
            />
            <Table renderApi={renderApi} data={tableData} />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
