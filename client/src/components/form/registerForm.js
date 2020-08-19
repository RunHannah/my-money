import React, { useState, useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import reg from '../../services/regService';
import auth from '../../services/authService';
import './form.css';

function Register(props) {
  const { setData } = useContext(DataContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const clearFields = (props) => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registeredUser = await reg.register(name, email, password);
      auth.loginWithJwt(registeredUser.data);
      clearFields();
      setData(null);
      props.history.push('/');
      window.location.reload();
    } catch (error) {
      // need to update
      console.log('error', error);
      alert('Registration error');
      clearFields();
    }
  };

  return (
    <div className='container'>
      <h1 className='formName'>Register</h1>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
