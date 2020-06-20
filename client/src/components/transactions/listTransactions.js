import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';

const ListTransactions = () => {
  const { data } = useContext(DataContext);
  console.log('data', data);
  return (
    <div>
      {data === 'object' && data.length > 0 ? (
        data.map((item) => <p key={item._id}>{item.transactionName}</p>)
      ) : (
        <p>Transaction Items</p>
      )}
    </div>
  );
};

export default ListTransactions;
