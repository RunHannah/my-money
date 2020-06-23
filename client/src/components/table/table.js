import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import './table.css';

const Table = () => {
  const { data } = useContext(DataContext);
  const columns = ['Date', 'Category', 'Transaction', 'Amount'];

  return (
    <table className='table'>
      <TableHeader columns={columns} />
      {typeof data === 'object' && data.length > 0 ? <TableBody /> : null}
    </table>
  );
};

export default Table;
