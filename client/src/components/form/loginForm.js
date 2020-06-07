import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../userContext';
import auth from '../../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const _isMounted = useRef(true);
  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const verifiedUser = await auth.login(email, password);

      if (_isMounted.current && verifiedUser) {
        clearFields();
        setUser(verifiedUser.data);
      }
    } catch (error) {
      // need to update
      console.log('error', error);
      alert('User email not found');
      clearFields();
    }
  };

  return (
    <div className='loginForm'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor='password'>Password</label>
        <input
          type='text'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
