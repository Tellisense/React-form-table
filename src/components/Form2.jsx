import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    marginBottom: '2rem',
  },

}));

export default function Form() {
  const classes = useStyles();



  const handleSubmit = e => {
    e.preventDefault()
    let formData = {
      appetizer: e.target[0].value,
      drink: e.target[1].value,
      mainCourse: e.target[2].value,
      dessert: e.target[3].value,
      email: e.target[4].value
    }
    console.log(formData)
  }



  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <TextField type="text" label="Appetizer" variant="outlined" />
      <TextField type="text" label="Drink" variant="outlined" />
      <TextField type="text" label="Main Course" variant="outlined" />
      <TextField type="text" label="Dessert" variant="outlined" />
      <TextField type="email" label="Email" variant="outlined" />
      <Input type="submit" />

    </form>
  );
}