import React, { useState, useEffect, useMemo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from './contexts/userContext';
import { DataContext } from './contexts/dataContext';
import { EditDataContext } from './contexts/editDataContext';
import Charts from './components/charts/charts';
import NavBar from './components/navbar/navbar';
import Form from './components/form/form';
import Profile from './components/profile/profile';
import Transactions from './components/transactions/transactions';
import transact from './services/transactService';
import auth from './services/authService';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  async function getTransactions() {
    try {
      const res = await transact.getTransactions();
      setData(res.data.data);
    } catch (err) {}
  }

  async function getUserTransactions(userId) {
    try {
      const res = await transact.getUserTransactions(userId);
      setData(res.data.data);
    } catch (err) {
      console.log('getUserTransactions', err);
    }
  }

  // get default or user data
  useEffect(() => {
    if (user) {
      getUserTransactions(user.id);
    }
    if (!user) {
      const loggedUser = auth.getCurrentUser();
      loggedUser ? setUser(loggedUser) : getTransactions();
    }
  }, [user]);

  return (
    <div className='App'>
      <DataContext.Provider value={{ data, setData }}>
        <UserContext.Provider value={providerValue}>
          <NavBar />
          <main>
            <Switch>
              <Route path='/login' component={Form} />
              <Route path='/register' component={Form} />
              <Route path='/profile' component={Profile} />
              {data && (
                <EditDataContext.Provider value={{ edit, setEdit }}>
                  <>
                    <Route path='/charts' component={Charts} />
                    <Route path='/transactions' component={Transactions} />
                    <Redirect from='/' exact to='/charts' />
                  </>
                </EditDataContext.Provider>
              )}
            </Switch>
          </main>
        </UserContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
