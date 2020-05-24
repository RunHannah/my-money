import React from 'react';
import { Line } from 'react-chartjs-2';
import './lineChart.css';

const LineChart = ({ data }) => {
  function changeToDollar(value) {
    return '$' + Number(value.toFixed(1)).toLocaleString();
  }

  return (
    <div className='lineChart'>
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
