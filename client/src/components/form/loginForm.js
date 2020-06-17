import React, { useState, useRef, useEffect } from 'react';
import auth from '../../services/authService';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await auth.login(email, password);
      clearFields();
      props.history.push('/');
      window.location.reload();
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
