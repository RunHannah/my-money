import React from 'react';
import AddTransaction from '../addTransaction/addTransaction';
import Table from '../table/table';
import Upload from '../upload/upload';
import './transaction.css';

const Transactions = () => {
  return (
    <div className='transactions'>
      <div className='addWrapper'>
        <Upload />
        <AddTransaction />
      </div>
      <Table />
    </div>
  );
};

export default Transactions;
