import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Chart() {
  const [data, setData] = useState(null);
  console.log('data', data);
  useEffect(() => {
    const getTransactions = async () => {
      const result = await axios('/api/transactions');

      setData(result.data.data);
    };
    getTransactions();
  }, []);

  return (
    <div className='chart'>
      {data
        ? data.map((item) => (
            <ul>
              <li key={item._id}>
                <p>{item.transactionName}</p>
              </li>
            </ul>
          ))
        : ''}
    </div>
  );
}

export default Chart;
