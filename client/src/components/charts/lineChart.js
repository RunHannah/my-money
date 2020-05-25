import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './lineChart.css';

const LineChart = ({ data }) => {
  const [lineData, setLineData] = useState({});

  function changeToDollar(value) {
    return '$' + Number(value.toFixed(1)).toLocaleString();
  }

  const loadData = (data) => {
    setLineData({
      labels: Object.keys(data),
      datasets: [
        {
          label: 'transactions',
          data: Object.values(data),
          backgroundColor: ['rgba(54, 162, 235, 0.2)'],
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
        },
      ],
    });
  };

  useEffect(() => {
    loadData(data);
  }, []);

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
