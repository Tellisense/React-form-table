import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect, useState } from "react";

import axios from "axios";

import Table from "./components/EnhancedTable";
import Form from "./components/Form";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "4rem",
  },
}));

function App() {
  const classes = useStyles();
  const [tableData, setTableData] = useState([]);
  // const [callApi, setCallApi] = useState(0);
  const [callApi, setCallApi] = useState(false);

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

  // setTimeout(() => {
  //   setCallApi(callApi + 1);
  // }, 1000);

  const renderApi = () => {
    setCallApi(!callApi);
  };

  console.log(`tableData: `, tableData);

  return (
    <Container className={classes.container} maxWidth='md'>
      {/* <div>Api Count</div>
      <span>{callApi}</span> */}
      <Form renderApi={renderApi} />
      <Table data={tableData} />
    </Container>
  );
}

export default App;
