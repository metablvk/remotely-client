import React from 'react';

const Hamburger = ({menuState, handleClick}) => (
  <button
    className={`hamburger md:hidden focus:outline-none ${
      menuState ? `open` : ''
    }`}
    onClick={handleClick}
  >
    <span className="hamburger-top"></span>
    <span className="hamburger-middle"></span>
    <span className="hamburger-bottom"></span>
  </button>
);

export default Hamburger;
