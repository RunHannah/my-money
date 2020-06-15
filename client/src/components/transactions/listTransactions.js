import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';

const ListTransactions = () => {
  const { data } = useContext(DataContext);
  return (
    <div>
      {data.map((item) => (
        <p key={item._id}>{item.transactionName}</p>
      ))}
    </div>
  );
};

export default ListTransactions;
