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
    color: 'green',
  },
  message: {
    minHeight: 40
  },
  displayNone: {
    display: 'none'
  },
  block: {
    display: 'block'
  },
  minWidth: {
    minWidth: 25
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 80
  },
  disabled: {
    cursor: 'not-allowed',
    color: 'gray'
  }
}));



const Table = ({ data, renderApi }) => {
  const [message, setMessage] = useState('')
  const [editable, setEditable] = useState(false)
  const [editableId, setEditableId] = useState(null)
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
      console.log(`delete: `, data)
      setMessage(`successfully deleted`)
      setTimeout(() => { setMessage('') }, 2000)
    } catch (error) {
      setMessage(`Error happened while deleting`)
      setTimeout(() => { setMessage('') }, 5000)
    }
    // console.log(`deleted line with id ${id}`)
  }
  const handleEdit = (item) => {
    setFormData({
      appetizer: item.appetizer,
      drink: item.drink,
      mainCourse: item.mainCourse,
      dessert: item.dessert,
      email: item.email
    })
    setEditableId(item.id)
    setEditable(true)
  }

  const handleDone = async (id) => {
    try {
      const { data } = await axios.put(`http://localhost:1337/orders/${id}`, formData)
      renderApi()
      console.log(`update:`, data)
      setEditable(false)
      setMessage(`successfully Updated`)

      setTimeout(() => { setMessage('') }, 2000)
    } catch (error) {
      setMessage(`Error happened while Updating`)
      setTimeout(() => { setMessage('') }, 5000)
    }

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
      <div className={`${classes.message} ${classes.green}`}>{message}</div>
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
                <td>{editable && editableId === item.id ? <input required placeholder={item.appetizer} type="text" onChange={handleChange} name="appetizer" value={formData.appetizer} /> : item.appetizer}</td>
                <td>{editable && editableId === item.id ? <input required placeholder={item.drink} type="text" onChange={handleChange} name="drink" value={formData.drink} /> : item.drink}</td>
                <td>{editable && editableId === item.id ? <input required placeholder={item.mainCourse} type="text" onChange={handleChange} name="mainCourse" value={formData.mainCourse} /> : item.mainCourse}</td>
                <td>{editable && editableId === item.id ? <input required placeholder={item.dessert} type="text" onChange={handleChange} name="dessert" value={formData.dessert} /> : item.dessert}</td>
                <td>{editable && editableId === item.id ? <input required placeholder={item.email} type="text" onChange={handleChange} name="email" value={formData.email} /> : item.email}</td>
                <td className={classes.icons}>
                  <span onClick={() => handleDone(item.id)} className={`${editable && editableId === item.id ? classes.block : classes.displayNone} ${classes.minWidth} ${classes.pointer} ${classes.green}`}><DoneIcon /></span>
                  <span onClick={editable && editableId === item.id ? null : () => handleEdit(item)} className={`${editable && editableId === item.id ? classes.disabled : ''}  ${classes.pointer}`}><EditIcon /></span>
                  <span onClick={editable && editableId === item.id ? null : () => handleDelete(item.id)} className={`${editable && editableId === item.id ? classes.disabled : ''}  ${classes.pointer}`}><DeleteForeverIcon /></span>
                </td>

              </tr>
            )
          })}
        </tbody>
      </table>
    </>

  )
}

export default Table
