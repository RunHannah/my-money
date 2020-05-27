import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registeredUser, setRegisteredUser] = useState({});

  useEffect(() => {
    console.log('registeredUser', registeredUser);
  }, [registeredUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/api/user/register', {
        name: name,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);
        setRegisteredUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
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
          type='text'
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
