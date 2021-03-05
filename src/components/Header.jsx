import React from 'react';
import '../assets/styles/components/Header.css'
import { useTheme } from '../context/ThemeContext'


const Header = (props) => {

  // const {darkmode, handleClick} = props

  // const { color } = useTheme();
  const { color  , handleClick, darkmode } = useTheme();

  const onClick = () => {
    handleClick()
  }
  return (
    <div className='header'>
      <h1 style={{color}}>ReactHooks</h1>
      <button 
        className={darkmode ? 'common-btn_dark' : 'common-btn'}
        type='button' 
        onClick={onClick}>{darkmode ? 'Go Light Mode' :'Go Dark Mode'}</button>
      {/* <button 
        type='button' 
        onClick={() => setDarkmode(!darkmode)}>{darkmode ? 'Dark Mode 2' : 'Light Mode 2'}</button> */}
    </div>
  );
};

export default Header;