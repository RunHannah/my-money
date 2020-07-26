import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import BarChart from './barChart';
import PieChart from './pieChart';
import OverviewBar from '../overviewBar/overviewBar';
import './charts.css';

const Charts = () => {
  const { data } = useContext(DataContext);
  return (
    <div className='charts'>
      <h2 className='chartsTitle'>2020 Activity</h2>
      {typeof data === 'object' ? (
        <Fragment>
          <div className='overviewBar'>
            <OverviewBar />
            <BarChart />
          </div>
          <div className='overviewPie'>
            <PieChart />
          </div>
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
