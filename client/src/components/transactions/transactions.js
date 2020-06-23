import React from 'react';
import AddTransaction from './addTransaction';
import Table from '../table/table';

const Transactions = () => {
  return (
    <div className='transactions'>
      <AddTransaction />
      <Table />
    </div>
  );
};

export default Transactions;
