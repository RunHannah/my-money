import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  console.log('data', data);
  useEffect(() => {
    const getTransactions = async () => {
      const result = await axios('/api/transactions');

      setData(result.data.data);
    };
    getTransactions();
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Personal Finance Tracker</p>
      </header>
      {data
        ? data.map((item) => (
            <ul>
              <li key={item._id}>
                <p>{item.transactionName}</p>
              </li>
            </ul>
          ))
        : ''}
    </div>
  );
}

export default App;
