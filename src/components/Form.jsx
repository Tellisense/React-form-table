import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

  const [formData, setFormData] = useState({
    appetizer: '',
    drink: '',
    mainCourse: '',
    dessert: '',
    email: ''
  })



  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(formData)
  }


  const handleSubmit = e => {
    e.preventDefault()
    console.log(formData)
  }



  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <TextField type="text" name="appetizer" value={formData.appetizer} onChange={handleChange} id="appetizer" label="Appetizer" variant="outlined" />
      <TextField type="text" name="drink" value={formData.drink} onChange={handleChange} id="drink" label="Drink" variant="outlined" />
      <TextField type="text" name="mainCourse" value={formData.mainCourse} onChange={handleChange} id="main-course" label="Main Course" variant="outlined" />
      <TextField type="text" name="dessert" value={formData.dessert} onChange={handleChange} id="dessert" label="Dessert" variant="outlined" />
      <TextField type="email" name="email" value={formData.email} onChange={handleChange} id="email" label="Email" variant="outlined" />
      <Button type="submit" variant="contained" color="secondary">
        Submit
</Button>
    </form>
  );
}