import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import BarChart from './barChart';
import LineChart from './lineChart';
import './charts.css';

const Charts = () => {
  const { data } = useContext(DataContext);
  console.log('data', data);
  return (
    <div className='charts'>
      {typeof data === 'object' ? (
        <Fragment>
          <BarChart />
          <LineChart />
        </Fragment>
      ) : (
        <p className='noData'>
          There are no transactions to display chart data. Please add a{' '}
          <NavLink className='addLink' to='/transactions'>
            transaction.
          </NavLink>{' '}
        </p>
      )}
    </div>
  );
};

export default Charts;
