import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Doughnut } from 'react-chartjs-2';
import './pieChart.css';

const LineChart = () => {
  const { data } = useContext(DataContext);
  const [pieMonthData, setPieMonthData] = useState({});
  const [pieCategoryData, setPieCategoryData] = useState({});

  const loadData = useCallback(() => {
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

    setPieMonthData({
      labels: Object.keys(totalMonth),
      datasets: [
        {
          label: 'Total by Month',
          data: Object.values(totalMonth),
          backgroundColor: [
            '#7D387D',
            '#DF2935',
            '#FFC71F',
            '#009FB7',
            '#FFC1CF',
            '#32533D',
            '#CB#AA6',
            '#C94277',
            '#3B60E4',
            '#95190C',
            '#F1F0CC',
            '#688B58',
          ],
          borderColor: '#CBCBD4',
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

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
            '#7D387D',
            '#DF2935',
            '#FFC71F',
            '#009FB7',
            '#FFC1CF',
            '#32533D',
            '#CB#AA6',
          ],
          borderColor: '#CBCBD4',
          borderWidth: 2,
        },
      ],
    });
  }, [data]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

  return (
    <div className='pieCharts'>
      <div className='pieChart'>
        <Doughnut
          data={pieMonthData}
          options={{
            responsive: true,
            title: { text: '2020 Expenses', display: true },
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
        <Doughnut
          data={pieCategoryData}
          options={{
            responsive: true,
            title: { text: '2020 Expenses', display: true },
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>
    </div>
  );
};

export default LineChart;
