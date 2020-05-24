import React, { useState, useEffect } from 'react';
import BarChart from './components/barChart';
import LineChart from './components/lineChart';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  async function getTransactions() {
    let totalMonth = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    await axios
      .get('/api/transactions')
      .then((res) => {
        for (const dataObj of res.data.data) {
          let month = months[new Date(dataObj.date).getMonth()];
          let amount = parseInt(dataObj.amount);

          if (month in totalMonth) {
            totalMonth[month] += amount;
          }
        }

        console.log('totalMonth', totalMonth);
        setData({
          labels: Object.keys(totalMonth),
          datasets: [
            {
              label: 'transactions',
              data: Object.values(totalMonth),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getTransactions();
    console.log('data', data);
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <p>Personal Finance Tracker</p>
      </header>
      <div className='charts'>
        <BarChart data={data} />
        <LineChart data={data} />
      </div>
    </div>
  );
}

export default App;
