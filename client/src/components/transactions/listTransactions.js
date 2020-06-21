import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import './transactions.css';

const ListTransactions = () => {
  const { data } = useContext(DataContext);
  return (
    <div className='listContainer'>
      {data === 'object' && data.length > 0 ? (
        data.map((item) => <p key={item._id}>{item.transactionName}</p>)
      ) : (
        <p>Transaction Items</p>
      )}
    </div>
  );
};

export default ListTransactions;
