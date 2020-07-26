import React, { useState, useContext, useEffect, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import cleanData from '../../utils/cleanDate';
import getTotalCategory from '../../utils/getTotalCategory';
import './overview.css';

function Overview() {
  const { data } = useContext(DataContext);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [maxCategory, setMaxCategory] = useState({});

  const getTotalYear = useCallback(() => {
    let totalAmount = 0;
    data.map((item) => {
      return (totalAmount += item.amount);
    });
    setTotal(totalAmount);
  }, [data]);

  const getAvgMonth = useCallback(() => {
    let months = [];
    data.map((item) => {
      const editDate = cleanData(item.date);
      const month = editDate.split('-')[1];

      if (months.indexOf(month) < 0) {
        months.push(month);
      }
      return months;
    });
    return total > 0 ? setAvg(Math.round(total / months.length)) : 0;
  }, [data, total]);

  const getHighestCategory = useCallback(() => {
    const results = getTotalCategory(data);
    let max = {};
    let category = Object.keys(results).reduce((a, b) =>
      results[a] > results[b] ? a : b
    );
    max = { category, amount: results[category] };
    return setMaxCategory(max);
  }, [data]);

  useEffect(() => {
    getTotalYear();
    getAvgMonth();
    getHighestCategory();
  }, [data, getAvgMonth, getTotalYear, getHighestCategory]);

  return (
    <div className='overviewSummary'>
      <span>
        <span className='overviewTitle'>Total Spending</span>
        <p>${total}</p>
      </span>
      <span>
        <span className='overviewTitle'>Average Monthly Spending</span>
        <p>${avg}</p>
      </span>
      <span>
        <span className='overviewTitle'>Highest Spending Category</span>
        <p>
          {maxCategory.category} ${maxCategory.amount}
        </p>
      </span>
    </div>
  );
}

export default Overview;
