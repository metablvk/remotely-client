import React from 'react';
import {Link} from 'react-router-dom';
import {links, authLinks} from './constants';

const Links = ({userInfo, logoutHandler, handleClick, mobile}) => {
  /**
   * If user info and mobile return with handle click and logout
   * else return with onClick and no logout handler
   *
   * if userInfo and not mobile return with logout handler
   * else return without logout handler
   */

  if (userInfo && mobile) {
    return authLinks.map((l, id) => {
      return l[0] === '/logout' ? (
        <Link to="" onClick={logoutHandler} key={id}>{`${l[1]}`}</Link>
      ) : (
        <Link to={`${l[0]}`} onClick={handleClick} key={id}>{`${l[1]}`}</Link>
      );
    });
  } else if (mobile) {
    return links.map((l, id) => (
      <Link to={`${l[0]}`} onClick={handleClick} key={id}>{`${l[1]}`}</Link>
    ));
  } else if (userInfo) {
    return authLinks.map((l, id) => {
      return l[0] === '/logout' ? (
        <Link to="" onClick={logoutHandler} key={id}>{`${l[1]}`}</Link>
      ) : (
        <Link to={`${l[0]}`} key={id}>{`${l[1]}`}</Link>
      );
    });
  } else {
    return links.map((l, id) => (
      <Link to={`${l[0]}`} onClick={handleClick} key={id}>{`${l[1]}`}</Link>
    ));
  }
};

export default Links;
