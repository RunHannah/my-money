import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Bar } from 'react-chartjs-2';
import './barChart.css';

const BarChart = () => {
  const { data } = useContext(DataContext);
  const [barMonthData, setBarMonthData] = useState({});
  const [barCategoryData, setBarCategoryData] = useState({});

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

  const loadMonthData = (data) => {
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

    setBarMonthData({
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
  };

  const loadCategoryData = (data) => {
    let categories = {};
    for (const dataObj of data) {
      let category = dataObj.category.toLowerCase();
      category = category.charAt(0).toUpperCase() + category.slice(1);
      let amount = parseInt(dataObj.amount);

      categories[category] = 0;

      if (category in categories) {
        categories[category] += amount;
      }
    }

    setBarCategoryData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'transactions',
          data: Object.values(categories),
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
  };

  useEffect(() => {
    loadMonthData(data);
  }, []);

  useEffect(() => {
    loadCategoryData(data);
  }, []);

  return (
    <div className='barCharts'>
      <h1>Bar Chart</h1>
      <div className='barChart'>
        <Bar
          data={barMonthData}
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
        <Bar
          data={barCategoryData}
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
