import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Bar } from 'react-chartjs-2';
import getTotalCategory from '../../utils/getTotalCategory';
import barStyling from './styling/barStyling';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './barChart.css';

const BarChart = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { data } = useContext(DataContext);
  const [barMonthData, setBarMonthData] = useState({});
  const [barCategoryData, setBarCategoryData] = useState({});

  const loadMonthData = useCallback(() => {
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

    setBarMonthData({
      labels: Object.keys(totalMonth),
      datasets: [
        {
          label: 'Total by Month',
          data: Object.values(totalMonth),
          backgroundColor: [
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
            '#6312BA',
          ],
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  const loadCategoryData = useCallback(() => {
    const results = getTotalCategory(data);

    setBarCategoryData({
      labels: Object.keys(results),
      datasets: [
        {
          label: 'Total by Category',
          data: Object.values(results),
          backgroundColor: [
            '#009fb7',
            '#009fb7',
            '#009fb7',
            '#009fb7',
            '#009fb7',
            '#009fb7',
            '#009fb7',
          ],
          borderColor: '#fff',
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  useEffect(() => {
    loadMonthData();
  }, [loadMonthData]);

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
    <div className='barCharts'>
      <Bar
        data={barMonthData}
        options={isMobile ? barStyling.mobileYear : barStyling.desktopYear}
      />
      <Bar
        data={barCategoryData}
        options={
          isMobile ? barStyling.mobileCategory : barStyling.desktopCategory
        }
      />
    </div>
  );
};

export default BarChart;
