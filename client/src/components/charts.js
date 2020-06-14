import React, { Fragment } from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';

const Charts = ({ data }) => {
  return (
    <div className='charts'>
      {typeof data === 'object' ? (
        <Fragment>
          <BarChart data={data} />
          <LineChart data={data} />
        </Fragment>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default Charts;
