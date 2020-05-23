import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Chart = () => {
  const [data, setData] = useState({});

  const getTransactions = async () => {
    let category = [];
    let amount = [];
    let date = [];
    await axios
      .get('/api/transactions')
      .then((res) => {
        for (const dataObj of res.data.data) {
          category.push(dataObj.category);
          amount.push(parseInt(dataObj.amount));
          date.push(dataObj.date);
        }

        setData({
          labels: date,
          datasets: [
            {
              label: 'transactions',
              data: amount,
              backgroundColor: ['rgb(178, 76, 178)'],
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(category, amount);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className='chart'>
      <h1>Line Chart</h1>
      <div>
        <Line
          data={data}
          options={{
            responsive: true,
            title: { text: 'Year Expenses', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                  },
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
