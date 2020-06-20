import React, { useContext, Fragment } from 'react';
import { DataContext } from '../../contexts/dataContext';
import BarChart from './barChart';
import LineChart from './lineChart';
import './charts.css';

const Charts = () => {
  const { data } = useContext(DataContext);
  return (
    <div className='charts'>
      {typeof data === 'object' ? (
        <Fragment>
          <BarChart />
          <LineChart />
        </Fragment>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default Charts;
