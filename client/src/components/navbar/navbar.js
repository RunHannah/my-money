import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar '>
      <Link className='navName' to='/'>
        Personal Finance Tracker
      </Link>
      <div className='navItems'>
        <NavLink className='charts' to='/charts'>
          Charts
        </NavLink>
        {!user.id && (
          <React.Fragment>
            <NavLink className='navLogin' to='/login'>
              Login
            </NavLink>
            <NavLink className='navRegister' to='/register'>
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user.id && (
          <React.Fragment>
            <NavLink className='navProfile' to='/profile'>
              {user.name}
            </NavLink>
            <NavLink className='navLogout' to='/logout'>
              Logout
            </NavLink>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
