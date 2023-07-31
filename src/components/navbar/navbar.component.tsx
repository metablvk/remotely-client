import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {links} from './constants';
import './navbar.styles.css';

// TODO: Style mobile menu
const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  useEffect(() => {
    // Hide scroll bar when menu is open
    if (menuState) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
    }
  }, [menuState]);

  const handleClick = () => setMenuState(!menuState);
  return (
    <>
      <nav className="container py-4 flex justify-between">
        <div className="navbar-brand">
          <Link to="/">Remotely</Link>
        </div>
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
        <div className="hidden md:flex space-x-4">
          {links.map((l, id) => {
            return <Link to={`${l[0]}`} key={id}>{`${l[1]}`}</Link>;
          })}
        </div>
      </nav>
      <hr className="border" />
      {/* Mobile navigation */}
      <nav
        className={`${
          menuState
            ? 'absolute left-0 bg-white w-full pl-10 pt-8 h-screen space-y-4 md:hidden'
            : 'hidden max-w-0 overflow-hidden p-0 md:hidden'
        } `}
      >
        <div className="container p-0  flex flex-col">
          {' '}
          {links.map((l, id) => {
            return (
              <Link
                to={`${l[0]}`}
                onClick={handleClick}
                key={id}
              >{`${l[1]}`}</Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
