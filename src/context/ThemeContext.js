import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }) {
  const [darkmode, setDarkmode] = useState(false);
  const color = '#f83f81'
  function handleClick () {
    return setDarkmode(!darkmode);    
  }
  
  const value = {
    color,
    darkmode,
    handleClick
  }  

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// export default ThemeContext;