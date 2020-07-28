const barStyling = {
  mobileYear: {
    responsive: true,
    title: {
      text: '$ Total Spending for Year',
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
              return '$' + Number(value.toFixed(1)).toLocaleString();
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
  },
  desktopYear: {
    responsive: true,
    title: {
      text: '$ Total Spending for Year',
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
            callback: function (value) {
              return '$' + Number(value.toFixed(1)).toLocaleString();
            },
            fontSize: 14,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 14,
          },
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
  },
  mobileCategory: {
    responsive: true,
    title: {
      text: '$ Total Spending by Category',
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
              return '$' + Number(value.toFixed(1)).toLocaleString();
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
  },
  desktopCategory: {
    responsive: true,
    title: {
      text: '$ Total Spending by Category',
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
            callback: function (value) {
              return '$' + Number(value.toFixed(1)).toLocaleString();
            },
            fontSize: 14,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontSize: 14,
          },
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
  },
};

export default barStyling;
