import React, { useState, useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../contexts/userContext';
import Logo from '../../assets/images/logo.png';
import './navbar.css';

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const NavBar = () => {
  const { user } = useContext(UserContext);
  const [navStatus, setNavStatus] = useState('closed');
  const [width, setWidth] = useState(window.innerWidth);
  const [deviceType, setDeviceType] = useState('');

  const openNav = () => setNavStatus('open');
  const closeNav = () => setNavStatus('closed');

  const wrapperRef = useRef(null);

  function useClickedOutside(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setNavStatus('closed');
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useClickedOutside(wrapperRef);

  useEffect(() => {
    const handleResize = debounce(() => setWidth(window.innerWidth), 100);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (width < 1024) {
      setDeviceType('isMobile');
    }
    if (width >= 1024) {
      setDeviceType('isDesktop');
    }
  }, [width]);

  return (
    <div className={`navbar ${deviceType}`} ref={wrapperRef}>
      <div className='navMenu'>
        <span className='openBtn' onClick={openNav}>
          &#9776;
        </span>
        <span className='logoName'>
          <img className='logo' src={Logo} alt='logo' />
          <h1 className='navName'>MyMoney</h1>
        </span>
      </div>
      <nav className={deviceType === 'isMobile' ? navStatus : 'fullNav'}>
        <span className='closeBtn' onClick={closeNav}>
          &times;
        </span>
        <div className='navItems'>
          <NavLink className='navCharts' to='/charts' onClick={closeNav}>
            Charts
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className='navLogin' to='/login' onClick={closeNav}>
                Login
              </NavLink>
              <NavLink
                className='navRegister'
                to='/register'
                onClick={closeNav}
              >
                Register
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink
                className='navTransaction'
                to='/transactions'
                onClick={closeNav}
              >
                Transactions
              </NavLink>
              <NavLink className='navProfile' to='/profile' onClick={closeNav}>
                {user.name}
              </NavLink>
              <NavLink className='navLogout' to='/logout' onClick={closeNav}>
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
