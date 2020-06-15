import React from 'react';
import AddTransaction from './addTransaction';
import ListTransactions from './listTransactions';

const Transactions = () => {
  return (
    <div>
      <AddTransaction />
      <ListTransactions />
    </div>
  );
};

export default Transactions;
