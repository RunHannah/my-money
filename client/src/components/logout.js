import { useEffect } from 'react';
import auth from '../services/authService';

const Logout = (props) => {
  useEffect(() => {
    auth.logout();
    props.history.push('/');
    window.location.reload();
  });

  return null;
};

export default Logout;
