import React from 'react'
import { useTheme } from '../context/ThemeProvider'


const Container = ({ children }) => {

  const theme = useTheme()

  const handleClick = () => {
    theme.setDarkMode(!theme.darkMode)
  }

  const themeStyles = React.useMemo(() => {
    return ({
      height: '100vh',
      backgroundColor: theme.darkMode ? 'black' : 'white',
      color: theme.darkMode ? 'white' : 'black'
    })
  }, [theme])


  return (
    <div style={themeStyles}>
      <button onClick={handleClick}>Change Theme</button>
      {children}
    </div>
  )
}

export default Container
