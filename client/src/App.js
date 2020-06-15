import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { DataContext } from './contexts/dataContext';
import axios from 'axios';
import auth from './services/authService';
import Charts from './components/charts/charts';
import NavBar from './components/navbar/navbar';
import Register from './components/form/register';
import LoginForm from './components/form/loginForm';
import Profile from './components/profile';
import Logout from './components/logout';
import Transactions from './components/transactions/transactions';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);

  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  async function getTransactions() {
    try {
      const res = await axios.get('/api/transactions');
      setData(res.data.data);
    } catch (err) {
      console.log('err', err);
    }
  }

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    console.log('*** user', user);
    const loggedUser = auth.getCurrentUser();
    setUser(loggedUser);
  }, []);

  return (
    <div className='App'>
      <DataContext.Provider value={{ data }}>
        <UserContext.Provider value={providerValue}>
          <NavBar />
          <Switch>
            <Route path='/login' component={LoginForm} />
            <Route path='/register' component={Register} />
            <Route path='/profile' component={Profile} />
            <Route path='/logout' component={Logout} />
            {data && (
              <>
                <Route path='/charts' component={Charts} />
                <Route path='/transactions' component={Transactions} />
                <Redirect from='/' exact to='/charts' />
              </>
            )}
          </Switch>
        </UserContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
