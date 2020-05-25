import React, { useState, useEffect } from 'react';
import Form from './components/form/form';
import BarChart from './components/charts/barChart';
import LineChart from './components/charts/lineChart';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState();

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
      <header className='App-header'>
        <p>Personal Finance Tracker</p>
      </header>
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
