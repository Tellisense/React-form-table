import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneIcon from '@material-ui/icons/Done';
import './table.css'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  pointer: {
    cursor: 'pointer'
  },
  green: {
    color: 'green'
  },
  displayNone: {
    display: 'none'
  },
  block: {
    display: 'block'
  }
}));



const Table = ({ data, renderApi }) => {
  const [message, setMessage] = useState('')
  const [editable, setEditable] = useState(false)
  const classes = useStyles()
  const [formData, setFormData] = useState({
    appetizer: '',
    drink: '',
    mainCourse: '',
    dessert: '',
    email: ''
  })


  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:1337/orders/${id}`)
      renderApi()
      setMessage(`successfully deleted`)
      setTimeout(() => { setMessage('') }, 2000)
    } catch (error) {
      setMessage(`Error happened while deleting`)
      setTimeout(() => { setMessage('') }, 5000)
    }
    // console.log(`deleted line with id ${id}`)
  }
  const handleEdit = (id) => {
    setEditable(true)
    console.log(`Update line with id ${id}`)
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    console.log(`formData: `, formData)
  }


  return (
    <>
      <div className={classes.green}>{message}</div>
      <table>
        <thead>
          <tr>
            <th>Appetizer</th>
            <th>Drink</th>
            <th>Main Course</th>
            <th>Dessert</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{editable ? <input placeholder={item.appetizer} type="text" onChange={handleChange} name="appetizer" value={formData.appetizer} /> : item.appetizer}</td>
                <td>{editable ? <input type="text" onChange={handleChange} name="drink" value={formData.drink} /> : item.drink}</td>
                <td>{editable ? <input type="text" onChange={handleChange} name={item.mainCourse} value={formData.mainCourse} /> : item.mainCourse}</td>
                <td>{editable ? <input type="text" onChange={handleChange} name="dessert" value={formData.dessert} /> : item.dessert}</td>
                <td>{editable ? <input type="text" onChange={handleChange} name="email" value={formData.email} /> : item.email}</td>
                <td onClick={() => handleEdit(item.id)} className={`${editable ? classes.block : classes.displayNone} ${classes.pointer} ${classes.green}`}><DoneIcon /></td>
                <td onClick={() => handleEdit(item.id)} className={classes.pointer}><EditIcon /></td>
                <td onClick={() => handleDelete(item.id)} className={classes.pointer}><DeleteForeverIcon /></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>

  )
}

export default Table
