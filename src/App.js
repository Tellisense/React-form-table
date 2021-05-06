import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Container from "./components/Container";
import Form from "./components/Form";
import Login2 from "./components/Login2";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Table from "./components/Table";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "4rem",
  },
  nav: {
    display: "flex",
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
              <ul>
                <li>
                  <Link to='/'>Table</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
                <li>
                  <Link to='/users'>Users</Link>
                </li>
              </ul>
            </nav>
          </div>
        </Navbar>
        <Switch>
          <Route path='/login'>
            <Login2 />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/users'>
            <Users />
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
