import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

import EnhancedTable from "./components/EnhancedTable";
import Form from "./components/Form";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "4rem",
  },
}));

function App() {
  const classes = useStyles();

  // api call from strapi

  return (
    <Container className={classes.container} maxWidth='md'>
      <Form />
      <EnhancedTable />
    </Container>
  );
}

export default App;
