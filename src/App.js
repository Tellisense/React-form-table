import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useTheme } from "./context/ThemeProvider";

function App() {
  const theme = useTheme();
  const changeTheme = () => {
    theme.setDarkMode(!theme.darkMode);
  };

  const themeStyles = React.useMemo(() => {
    return {
      height: "100vh",
      backgroundColor: theme.darkMode ? "black" : "white",
      color: theme.darkMode ? "white" : "black",
    };
  }, [theme]);

  return (
    <div style={themeStyles}>
      <Router>
        <Navbar changeTheme={changeTheme} />
      </Router>
    </div>
  );
}

export default App;
