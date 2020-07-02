import React from 'react';
import './table.css';

const TableHeader = (props) => {
  return (
    <thead className='tableHead'>
      <tr className='tableRow'>
        {props.columns.map((column, index) => (
          <th className={column} key={index}>
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
