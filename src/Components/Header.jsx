import React from "react";
import LightIcon from '../assets/images/icon-moon.svg';
import DarkIcon from '../assets/images/icon-sun.svg';

const Header = ({ theme, toggleTheme }) => {
  return (
    <div className="header">
      <h1 className="title">TODO</h1>
      <button
        className="btn-switch"
        onClick={toggleTheme}
      >
      <img src={theme === 'light' ? LightIcon : DarkIcon}/>
      </button>
    </div>
  )
}

export default Header