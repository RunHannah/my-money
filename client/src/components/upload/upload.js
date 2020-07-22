import React, { useState, useContext, useEffect } from 'react';
import { parse } from 'papaparse';
import { DataContext } from '../../contexts/dataContext';
import { UserContext } from '../../contexts/userContext';
import transact from '../../services/transactService';

function Upload() {
  const [highlighted, setHighlighted] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const { user } = useContext(UserContext);
  const { setData } = useContext(DataContext);

  async function getUserTransactions(userId) {
    try {
      const res = await transact.getUserTransactions(userId);
      setData(res.data.data);
    } catch (err) {
      console.log('getUserTransactions', err);
    }
  }

  useEffect(() => {
    const checkCsvData = () => {
      if (csvData.length > 0) {
        csvData.map(async (entry) => {
          let record = {};
          Object.keys(entry).map((key) => {
            key.toLowerCase();

            if (key === 'category') {
              const val = entry[key];
              const valUpdated = val[0].toUpperCase() + val.slice(1);
              return (record[`${key}`] = valUpdated);
            } else {
              record[`${key}`] = entry[key];
              return (record.userId = user.id);
            }
          });
          await transact.addNewTransaction(record);
        });
      }
      getUserTransactions(user.id);
    };

    if (csvData.length > 0) {
      checkCsvData();
    }
  });

  return (
    <div
      style={{
        color: 'blue',
        width: '200px',
        height: '50px',
        marginLeft: 'auto',
        backgroundColor: highlighted ? 'grey' : '#fff',
      }}
      onDragEnter={() => {
        setHighlighted(true);
      }}
      onDragLeave={() => {
        setHighlighted(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        setHighlighted(false);

        Array.from(e.dataTransfer.files)
          .filter((file) => file.type === 'text/csv')
          .forEach(async (file) => {
            const text = await file.text();
            const result = parse(text, { header: true });
            setCsvData((existing) => [...existing, ...result.data]);
          });
      }}
    >
      Drop .csv file here
    </div>
  );
}

export default Upload;
