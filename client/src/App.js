import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Form from './components/form/form';
import BarChart from './components/charts/barChart';
import LineChart from './components/charts/lineChart';
import NavBar from './components/navbar/navbar';
import Register from './components/register';
import LoginForm from './components/form/loginForm';
import { UserContext } from './userContext';
// import auth from './services/authService';
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
    // const authUser = {
    //   id: null,
    //   token: null,
    //   loginUser: function (email, password) {
    //     return auth.login(email, password);
    //   },
    //   logoutUser: function () {
    //     this.setState({ user: {} });
    //   },
    // };

    // setUser(user);
  }, []);

  return (
    <div className='App'>
      <UserContext.Provider value={providerValue}>
        <NavBar user={user} />
        <Switch>
          <Route path='/login' component={LoginForm} />
          <Route path='/register' component={Register} />} />
        </Switch>
      </UserContext.Provider>
      <Form />
      {data ? (
        <div className='charts'>
          <BarChart data={data} />
          <LineChart data={data} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default App;
