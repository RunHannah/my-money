import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Form from './components/form/form';
import BarChart from './components/charts/barChart';
import LineChart from './components/charts/lineChart';
import NavBar from './components/navbar/navbar';
import Register from './components/register';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [user, setUser] = useState('');

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

  return (
    <div className='App'>
      <NavBar user={user} />
      <Switch>
        <Route path='/register' component={Register} />
      </Switch>
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
