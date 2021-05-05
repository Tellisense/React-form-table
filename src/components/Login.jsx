import React, { useState } from 'react'

const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: '',
    password: ''
  })


  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // make the api call
    //response of the api call will save user into context
  }


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={loginData.userName} name="userName" onChange={handleChange} />
      <input type="text" value={loginData.password} name="password" onChange={handleChange} />
      <input type="submit" value="login"></input>
    </form>
  )
}

export default Login
