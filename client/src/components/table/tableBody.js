import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import './table.css';

const TableBody = () => {
  const { data } = useContext(DataContext);

  return (
    <tbody>
      {data.map((item, index) => (
        <tr key={item._id}>
          <td key={item.date + index}>
            {new Date(item.date).toLocaleDateString('en-US')}
          </td>
          <td key={item.category + index}>{item.category}</td>
          <td key={item.transactionName + index}>{item.transactionName}</td>
          <td key={item.amount + index}>{item.amount}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
