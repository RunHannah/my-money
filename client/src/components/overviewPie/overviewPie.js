import React, { useState, useContext, useEffect, useCallback } from 'react';
import { DataContext } from '../../contexts/dataContext';
import getPercentCategory from '../../utils/getPercentCategory';
import './overviewPie.css';

function OverviewPie() {
  const { data } = useContext(DataContext);
  const [minMax, setMinMax] = useState({});

  const getMinMax = useCallback(() => {
    const results = getPercentCategory(data);
    let minMaxResults = {};
    const maxCat = Object.keys(results).reduce((a, b) =>
      results[a] > results[b] ? a : b
    );
    const minCat = Object.keys(results).reduce((a, b) =>
      results[a] < results[b] ? a : b
    );
    minMaxResults = {
      maxCat,
      minCat,
      maxPercent: results[maxCat],
      minPercent: results[minCat],
    };
    return setMinMax(minMaxResults);
  }, [data]);

  useEffect(() => {
    getMinMax();
  }, [data, getMinMax]);

  return (
    <div className='summaryPie'>
      <span>
        <span className='overviewTitle'>Lowest % Spending</span>
        <p>
          {minMax.minCat} {minMax.minPercent}%
        </p>
      </span>
      <span>
        <span className='overviewTitle'>Top % Spending</span>
        <p>
          {minMax.maxCat} {minMax.maxPercent}%
        </p>
      </span>
    </div>
  );
}

export default OverviewPie;
