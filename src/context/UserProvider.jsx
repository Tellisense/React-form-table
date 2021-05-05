import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState('')

  console.log(`currentUser: `, currentUser)
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
