import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import { UserContext } from '../../contexts/userContext';
import { EditDataContext } from '../../contexts/editDataContext';
import transact from '../../services/transactService';
import Delete from '../../assets/images/delete.png';
import Edit from '../../assets/images/edit.png';
import cleanDate from '../../utils/cleanDate';
import './table.css';

const TableBody = (props) => {
  const { data, setData } = useContext(DataContext);
  const { user } = useContext(UserContext);
  const { edit, setEdit } = useContext(EditDataContext);

  const remove = async (item) => {
    try {
      await transact.deleteTransaction(item._id);

      const res = await transact.getUserTransactions(user._id);
      setData(res.data.data);
    } catch (err) {
      console.log('delete error', err);
    }
  };

  const handleEdit = async (item) => {
    const userTransactions = await transact.getUserTransactions(user.id);
    const currentItem = userTransactions.data.data.filter(
      (obj) => obj._id === item._id
    );
    setEdit(currentItem);
  };

  useEffect(() => {
    if (edit) {
      props.history.push('/transactions');
    }
  }, [edit, props.history]);

  return (
    <tbody className='tableBody'>
      {data.map((item, index) => (
        <tr className='tableBodyRow' key={item._id}>
          <td key={item.date + index}>{cleanDate(item.date)}</td>
          <td key={item.category + index}>{item.category}</td>
          <td key={item.transactionName + index}>{item.transactionName}</td>
          <td key={item.amount + index}>{item.amount}</td>
          <td onClick={() => handleEdit(item)}>
            <img className='edit' src={Edit} alt='edit' />
          </td>
          <td onClick={() => remove(item)}>
            <img className='delete' src={Delete} alt='delete' />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default withRouter(TableBody);
