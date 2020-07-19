import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import BarChart from './barChart';
import PieChart from './pieChart';
import './charts.css';

const Charts = () => {
  const { data } = useContext(DataContext);
  return (
    <div className='charts'>
      {typeof data === 'object' ? (
        <Fragment>
          <BarChart />
          <PieChart />
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
