import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import { UserContext } from '../../contexts/userContext';
import transact from '../../services/transactService';
import './table.css';

const TableBody = () => {
  const { data, setData } = useContext(DataContext);
  const { user } = useContext(UserContext);

  const remove = async (item) => {
    try {
      await transact.deleteTransaction(item._id);

      const res = await transact.getUserTransactions(user._id);
      setData(res.data.data);
    } catch (err) {
      console.log('delete error', err);
    }
  };

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
          <td onClick={() => remove(item)}>Remove</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
