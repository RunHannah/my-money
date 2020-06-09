import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect } from 'react-router-dom';
import Charts from './components/charts';
import NavBar from './components/navbar/navbar';
import Register from './components/form/register';
import LoginForm from './components/form/loginForm';
import Profile from './components/profile';
import Logout from './components/logout';
import { UserContext } from './userContext';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState({});

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  async function getTransactions() {
    await axios
      .get('/api/transactions')
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    console.log('*** user', user);
  }, [user]);

  return (
    <div className='App'>
      <UserContext.Provider value={providerValue}>
        <NavBar />
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/logout' component={Logout} />
          {data && (
            <>
              <Route path='/charts' render={() => <Charts data={data} />} />
              <Redirect from='/' exact to='/charts' />
            </>
          )}
        </Switch>
      </UserContext.Provider>
    </div>
  );
}

export default App;
