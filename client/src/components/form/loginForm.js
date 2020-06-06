import React, { useState, useContext } from 'react';
import { UserContext } from '../../userContext';
import auth from '../../services/authService';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verifiedUser = await auth.login(email, password);
    setUser(verifiedUser.data);

    setEmail('');
    setPassword('');
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
