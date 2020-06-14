import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../../userContext';
import './navbar.css';

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className='navbar '>
      <Link className='navName' to='/'>
        Personal Finance Tracker
      </Link>
      <div className='navItems'>
        <NavLink className='charts' to='/charts'>
          Charts
        </NavLink>
        {!user && (
          <React.Fragment>
            <NavLink className='navLogin' to='/login'>
              Login
            </NavLink>
            <NavLink className='navRegister' to='/register'>
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className='navProfile' to='/profile'>
              Profile
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
