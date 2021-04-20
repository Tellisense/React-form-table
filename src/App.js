import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { SignalCellularNull } from "@material-ui/icons";

import React, { useEffect, useState } from "react";

import axios from "axios";

import Form from "./components/Form";
import Modal from "./components/Modal";
import Table from "./components/Table";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "4rem",
  },
}));

function App() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  // const [callApi, setCallApi] = useState(0);
  const [callApi, setCallApi] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  // api call from strapi
  useEffect(() => {
    try {
      const api = async () => {
        const { data } = await axios.get("http://localhost:1337/orders");
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
    <Container className={classes.container} maxWidth='md'>
      <Modal openModal={openModal} handleOpenModal={handleOpenModal}>
        Modal content
      </Modal>
      <Button onClick={handleOpenModal} variant='contained' color='primary'>
        Open Modal
      </Button>

      <div>Table length: {tableData.length}</div>
      <div>Number of times clicked: {counter}</div>

      <Form setCounter={setCounter} counter={counter} renderApi={renderApi} />
      <Table renderApi={renderApi} data={tableData} />
    </Container>
  );
}

export default App;
