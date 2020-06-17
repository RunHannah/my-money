import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Line } from 'react-chartjs-2';
import './lineChart.css';

const LineChart = () => {
  const { data } = useContext(DataContext);
  const [lineData, setLineData] = useState({});

  function changeToDollar(value) {
    return '$' + Number(value.toFixed(1)).toLocaleString();
  }

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

  const loadData = (data) => {
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

    for (const dataObj of data) {
      let month = months[new Date(dataObj.date).getMonth()];
      let amount = parseInt(dataObj.amount);

      if (month in totalMonth) {
        totalMonth[month] += amount;
      }
    }

    setLineData({
      labels: Object.keys(totalMonth),
      datasets: [
        {
          label: 'transactions',
          data: Object.values(totalMonth),
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
        },
      ],
    });
  };

  useEffect(() => {
    loadData(data);
  }, [data]);

  return (
    <div className='lineChart'>
      <h1>Line Chart</h1>
      <div>
        <Line
          data={lineData}
          options={{
            responsive: true,
            title: { text: 'Year Expenses', display: true },
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true,
                    callback: function (value, index, values) {
                      return changeToDollar(value);
                    },
                  },
                  gridLines: {
                    display: true,
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

export default LineChart;
