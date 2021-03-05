import React from 'react';
import { useTheme } from '../context/ThemeContext';

const GlobalContainer = ({children}) => {

  const { darkmode } = useTheme();
  return (
    <div className={darkmode ? 'App_dark' : 'App'}>
      {children}
    </div>
  );
};

export default GlobalContainer;