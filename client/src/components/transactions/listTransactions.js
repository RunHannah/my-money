import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import './transactions.css';

const ListTransactions = () => {
  const { data } = useContext(DataContext);
  return (
    <div className='listContainer'>
      {typeof data === 'object' && data.length > 0 ? (
        data.map((item) => (
          <li key={item._id}>
            {item.date}
            {item.category}
            {item.transactionName}
            {item.amount}
          </li>
        ))
      ) : (
        <p>Transaction Items</p>
      )}
    </div>
  );
};

export default ListTransactions;
