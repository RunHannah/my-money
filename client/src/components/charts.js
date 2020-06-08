import React from 'react';
import BarChart from './charts/barChart';
import LineChart from './charts/lineChart';

function Charts({ data }) {
  return (
    <div className='charts'>
      <BarChart data={data} />
      <LineChart data={data} />
    </div>
  );
}

export default Charts;
