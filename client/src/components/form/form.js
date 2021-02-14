import React, { useState, useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import reg from '../../services/regService';
import auth from '../../services/authService';
import './form.css';

function Form (props) {
    const { setData } = useContext(DataContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [path, _ ] = useState(props.location.pathname);
    const formName = path === '/register' ? 'Register' : 'Login';

    const clearFields = (props) => {
        if (path === '/register') setName('');
        setEmail('');
        setPassword('');
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (path === '/register') {
            const registeredUser = await reg.register(name, email, password);
            auth.loginWithJwt(registeredUser.data);
        }
        if (path === '/login') {
            await auth.login(email, password);
        }

      clearFields();
      setData(null);
      props.history.push('/charts');
      window.location.reload();
    } catch (error) {
      alert(error.response.data.error);
      clearFields();
    }
  };

  const nameInput = () => {
      if (path === '/register') {
        return (
            <>
                <label htmlFor='name'>Name</label>
                <input
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                />
            </>
        )
      }
    }

  return (
    <div className='container'>
      <h1 className='formName'>{formName}</h1>
      <form className='form' onSubmit={handleSubmit}>
        {nameInput()}
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={'Enter a valid email address'}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={path === '/register' ? "Minimum 6 characters, letters & numbers" : "Please provide your password"}
        />
        <button>{formName}</button>
      </form>
    </div>
  );
}

export default Form;