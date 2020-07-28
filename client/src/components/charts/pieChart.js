import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Doughnut } from 'react-chartjs-2';
import getPercentCategory from '../../utils/getPercentCategory';
import pieStyling from './styling/pieStyling';
import './pieChart.css';

const PieChart = () => {
  const [isMobile, setIsMobile] = useState(false);
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

  const loadCatMonthData = useCallback(() => {
    const monthsArr = [
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
      const dataObjMonth = monthsArr[monthInt];

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
  }, [data, month]);

  const handleSubmit = (e) => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    loadCatMonthData();
  }, [loadCatMonthData]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }, []);

  return (
    <div className='pieCharts'>
      <Doughnut
        data={pieCategoryData}
        options={isMobile ? pieStyling.mobileYear : pieStyling.desktopYear}
      />{' '}
      <div className='pieCatMonth'>
        <form className='form' onChange={handleSubmit}>
          <label>Select % spending by month</label>
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
          options={isMobile ? pieStyling.mobileMonth : pieStyling.desktopMonth}
        />
      </div>
    </div>
  );
};

export default PieChart;
