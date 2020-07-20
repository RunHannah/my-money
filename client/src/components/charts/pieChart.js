import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Doughnut } from 'react-chartjs-2';
import './pieChart.css';

const LineChart = () => {
  const { data } = useContext(DataContext);
  const [pieMonthCatData, setPieMonthCatData] = useState({});
  const [pieCategoryData, setPieCategoryData] = useState({});
  const [month, setMonth] = useState('January');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const loadCategoryData = useCallback(() => {
    let categories = {
      Dining: 0,
      Groceries: 0,
      Health: 0,
      Other: 0,
      Transport: 0,
      Travel: 0,
      Utilities: 0,
    };

    for (const dataObj of data) {
      let category = dataObj.category.toLowerCase();
      category = category.charAt(0).toUpperCase() + category.slice(1);
      let amount = parseInt(dataObj.amount);

      if (category in categories) {
        categories[category] += amount;
      }
    }

    setPieCategoryData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Total by Category',
          data: Object.values(categories),
          backgroundColor: [
            '#7E55B4',
            '#DF2935',
            '#FFC71F',
            '#009FB7',
            '#FFC1CF',
            '#2CCC00',
            '#FFFECB',
          ],
          borderColor: '#CBCBD4',
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  const loadCatMonthData = useCallback(
    (month) => {
      let categories = {
        Dining: null,
        Groceries: null,
        Health: null,
        Other: null,
        Transport: null,
        Travel: null,
        Utilities: null,
      };

      for (const dataObj of data) {
        const monthInt = parseInt(dataObj.date.split('-')[1]) - 1;
        const dataObjMonth = months[monthInt];

        if (dataObjMonth === month) {
          let category = dataObj.category.toLowerCase();
          category = category.charAt(0).toUpperCase() + category.slice(1);

          let amount = parseInt(dataObj.amount);

          if (category in categories) {
            categories[category] += amount;
          }
        }
      }

      setPieMonthCatData({
        labels: Object.keys(categories),
        datasets: [
          {
            label: 'Total by Category',
            data: Object.values(categories),
            backgroundColor: [
              '#7E55B4',
              '#DF2935',
              '#FFC71F',
              '#009FB7',
              '#FFC1CF',
              '#2CCC00',
              '#FFFECB',
            ],
            borderColor: '#CBCBD4',
            borderWidth: 2,
          },
        ],
      });
    },
    [data]
  );

  const handleSubmit = (e) => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    loadCatMonthData(month);
  }, [loadCatMonthData, month]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

  return (
    <div className='pieCharts'>
      <div className='pieChart'>
        <div className='pieCatMonth'>
          <form className='form' onChange={handleSubmit}>
            <label>Filter spending by month</label>
            <select
              name='month'
              value={month || ''}
              onChange={(e) => setMonth(e.target.value)}
            >
              {months.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </form>
          <Doughnut
            data={pieMonthCatData}
            options={{
              responsive: true,
              title: {
                text: `2020 Spending for ${month}`,
                display: true,
                fontSize: 15,
                padding: 20,
              },
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              legend: {
                position: 'left',
              },
              layout: {
                padding: {
                  left: 10,
                  right: 10,
                  top: 0,
                  bottom: 10,
                },
              },
              plugins: {
                datalabels: {
                  color: '#000',
                },
              },
              inGraphDataTmpl: "<%=(v6 > 0 ? v6+' %' : ' ')%>",
            }}
          />
        </div>
        <Doughnut
          data={pieCategoryData}
          options={{
            responsive: true,
            title: {
              text: '2020 Spending by Category',
              display: true,
              fontSize: 15,
              padding: 20,
            },
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            legend: {
              position: 'left',
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 10,
              },
            },
            plugins: {
              datalabels: {
                color: '#000',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
