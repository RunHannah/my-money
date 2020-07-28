const pieStyling = {
  mobileYear: {
    responsive: true,
    title: {
      text: '% Spending by Category for Year',
      display: true,
      fontSize: 12,
      padding: 12,
    },
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
        padding: 5,
      },
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
  },
  desktopYear: {
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
      labels: {
        boxWidth: 30,
        padding: 10,
        fontSize: 14,
      },
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
        font: {
          size: 14,
        },
      },
    },
  },
  mobileMonth: {
    responsive: true,
    title: {
      text: '% Spending by Category and Month',
      display: true,
      fontSize: 12,
      padding: 12,
    },
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
        padding: 5,
      },
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
  },
  desktopMonth: {
    responsive: true,
    title: {
      text: '% Spending by Category and Month',
      display: true,
      fontSize: 15,
      padding: 20,
    },
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    legend: {
      position: 'left',
      labels: {
        boxWidth: 30,
        padding: 10,
        fontSize: 14,
      },
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
        font: {
          size: 14,
        },
      },
    },
    inGraphDataTmpl: "<%=(v6 > 0 ? v6+' %' : ' ')%>",
  },
};

export default pieStyling;
