import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import { DataContext } from '../../contexts/dataContext';
import transact from '../../services/transactService';
import './navbar.css';

const NavBar = () => {
  const { user } = useContext(UserContext);
  const { setData } = useContext(DataContext);

  async function getUserTransactions(userId) {
    try {
      const res = await transact.getUserTransactions(userId);
      setData(res.data.data);
    } catch (err) {
      console.log('getUserTransactions', err);
    }
  }

  const clickHandler = (user) => {
    getUserTransactions(user.id);
  };

  return (
    <nav className='navbar'>
      <h1 className='navName'>Personal Finance Tracker</h1>
      <div className='navItems'>
        <NavLink
          className='navCharts'
          to='/charts'
          onClick={() => (user ? clickHandler(user) : null)}
        >
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
  );
};

export default NavBar;
