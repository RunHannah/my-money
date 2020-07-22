import React from 'react';
import AddTransaction from './addTransaction';
import Table from '../table/table';
import Upload from '../upload/upload';

const Transactions = () => {
  return (
    <div className='transactions'>
      <Upload />
      <AddTransaction />
      <Table />
    </div>
  );
};

export default Transactions;
