import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';
import {useDispatch} from 'react-redux';
import {useLogoutMutation} from '../../store/slices/api/user/user.slice';
import {logout} from '../../store/slices/auth/auth.slice';
import Links from './links/links.component';
import Hamburger from './hamburger/hamburger.component';
import './navbar.styles.css';

// TODO: Style mobile menu
const Navbar = () => {
  const [menuState, setMenuState] = useState(false);
  const {userInfo} = useAppSelector(state => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      await logoutApiCall(userInfo).unwrap();
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };
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
        <Hamburger menuState={menuState} handleClick={handleClick} />
        <div className="hidden md:flex space-x-4">
          <Links
            userInfo={userInfo}
            logoutHandler={logoutHandler}
            handleClick={handleClick}
            mobile={false}
          />
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
          <Links
            userInfo={userInfo}
            logoutHandler={logoutHandler}
            handleClick={handleClick}
            mobile={true}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
