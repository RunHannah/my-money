import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { Bar } from 'react-chartjs-2';
import getTotalCategory from '../../utils/getTotalCategory';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './barChart.css';

const BarChart = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { data } = useContext(DataContext);
  const [barMonthData, setBarMonthData] = useState({});
  const [barCategoryData, setBarCategoryData] = useState({});

  function changeToDollar(value) {
    return '$' + Number(value.toFixed(1)).toLocaleString();
  }

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

  const barDesktopStyle = {
    responsive: true,
    title: {
      text: '$ Total Spending',
      display: true,
      fontSize: 15,
      padding: 20,
    },
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
            fontSize: 12,
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
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 10,
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        offset: -5,
        font: {
          size: 14,
        },
        formatter: function (value) {
          return '$' + value;
        },
      },
    },
  };

  const barMobileStyle = {
    responsive: true,
    title: {
      text: '$ Total Spending',
      display: true,
      fontSize: 12,
      padding: 12,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5,
            beginAtZero: true,
            callback: function (value) {
              return changeToDollar(value);
            },
            fontSize: 10,
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
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 0,
        bottom: 5,
      },
    },
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        offset: -5,
        font: {
          size: 10,
        },
        formatter: function (value) {
          return '$' + value;
        },
      },
    },
  };

  useEffect(() => {
    loadMonthData();
  }, [loadMonthData]);

  useEffect(() => {
    loadCategoryData();
  }, [loadCategoryData]);

  useEffect(() => {
    if (window.innerWidth > 769) {
      setIsDesktop(true);
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsDesktop(false);
    }
  }, []);

  return (
    <div className='barCharts'>
      <Bar
        data={barMonthData}
        options={isMobile ? barMobileStyle : barDesktopStyle}
      />
      <Bar
        data={barCategoryData}
        options={isMobile ? barMobileStyle : barDesktopStyle}
      />
    </div>
  );
};

export default BarChart;
