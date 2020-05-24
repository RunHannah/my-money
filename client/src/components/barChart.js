import React from 'react';
import { Bar } from 'react-chartjs-2';
import './barChart.css';

const BarChart = ({ data }) => {
  function changeToDollar(value) {
    return '$' + Number(value.toFixed(1)).toLocaleString();
  }

  return (
    <div className='barChart'>
      <h1>Bar Chart</h1>
      <div>
        <Bar
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

export default BarChart;
