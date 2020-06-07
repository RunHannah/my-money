import React, { useState, useContext, useRef, useEffect } from 'react';
import { UserContext } from '../../userContext';
import reg from '../../services/regService';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const _isMounted = useRef(true);
  const clearFields = () => {
    setName('');
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
      const registeredUser = await reg.register(name, email, password);
      if (_isMounted.current && registeredUser) {
        clearFields();

        setUser(registeredUser.data);
      }
    } catch (error) {
      // need to update
      console.log('error', error);
      alert('Registration error');
      clearFields();
    }
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
