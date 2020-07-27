import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Doughnut } from 'react-chartjs-2';
import getPercentCategory from '../../utils/getPercentCategory';
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

  const loadCategoryData = useCallback(async () => {
    const categories = getPercentCategory(data);

    setPieCategoryData({
      labels: Object.keys(categories),
      datasets: [
        {
          label: 'Percent Spending by Category for 2020 Year',
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
        Food: null,
        Entertainment: null,
        Health: null,
        Other: null,
        Auto: null,
        Travel: null,
        Home: null,
      };

      let total = 0;
      for (const dataObj of data) {
        const monthInt = parseInt(dataObj.date.split('-')[1]) - 1;
        const dataObjMonth = months[monthInt];

        if (dataObjMonth === month) {
          let category = dataObj.category.toLowerCase();
          let amount = parseInt(dataObj.amount);

          category = category.charAt(0).toUpperCase() + category.slice(1);
          total += amount;

          if (category in categories) {
            categories[category] += amount;
          }
        }
      }
      // calculate to %
      Object.keys(categories).map((key) => {
        categories[key] = Math.round((categories[key] / total) * 100);
        if (categories[key] === 0 || isNaN(categories[key]))
          return (categories[key] = null);
        return categories;
      });

      setPieMonthCatData({
        labels: Object.keys(categories),
        datasets: [
          {
            label: 'Percent Spending by Category & Month',
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
      <div className='pieCatMonth'>
        <form className='form' onChange={handleSubmit}>
          <label>Filter % spending by month</label>
          <select
            className='pieSelect'
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
              text: `% Spending by Category for ${month}`,
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
                formatter: function (value) {
                  if (value !== null) {
                    return value + '%';
                  }
                },
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
            text: '% Spending by Category for Year',
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
              formatter: function (value) {
                if (value !== null) {
                  return value + '%';
                }
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
