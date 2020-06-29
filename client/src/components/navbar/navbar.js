import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import './navbar.css';

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [navStatus, setNavStatus] = useState('closed');
  const sideNav = window.innerWidth < 768 ? 'sideNav' : 'desktopNav';

  const openNav = () => setNavStatus('open');
  const closeNav = () => setNavStatus('closed');

  return (
    <div className={`navbar ${sideNav}`}>
      <div className='navMenu'>
        <span className='openBtn' onClick={openNav}>
          &#9776;
        </span>
        <h1 className='navName'>Personal Finance Tracker</h1>
      </div>
      <nav className={sideNav === 'sideNav' ? navStatus : 'fullNav'}>
        <span className='closeBtn' onClick={closeNav}>
          &times;
        </span>
        <div className='navItems'>
          <NavLink className='navCharts' to='/charts'>
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
              <NavLink className='navProfile' to='/transactions'>
                Transactions
              </NavLink>
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
    </div>
  );
};

export default NavBar;
