import React, { useState, useContext, useEffect } from 'react';
import { parse } from 'papaparse';
import { DataContext } from '../../contexts/dataContext';
import { UserContext } from '../../contexts/userContext';
import transact from '../../services/transactService';
import './upload.css';

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
        let errors = [];
        csvData.map(async (item) => {
          let record = {};

          Object.keys(item).map((key) => {
            key = key.toLowerCase();

            switch (key) {
              case 'category':
                {
                  let val = item[key].trim().toLowerCase();
                  if (
                    ![
                      'food',
                      'entertainment',
                      'health',
                      'other',
                      'auto',
                      'travel',
                      'home',
                    ].includes(val)
                  ) {
                    val = 'other';
                  }
                  const valUpdated = val[0].toUpperCase() + val.slice(1);
                  record[`${key}`] = valUpdated;
                }
                break;
              case 'amount':
                {
                  const val = item[key].trim();
                  if (!/^[0-9]*$/gm.test(val)) {
                    errors.push(`${val} is not valid number`);
                  } else {
                    record[`${key}`] = val;
                  }
                }
                break;
              case 'description':
                {
                  const val = item[key].trim();
                  record[`${key}`] = val;
                }
                break;
              case 'date':
                {
                  const val = item[key].trim();
                  record[`${key}`] = val;
                }
                break;
              default:
                errors.push(`${key} is an invalid field}`);
                break;
            } // end of switch case
            return record;
          }); // end of item loop
          if (errors.length === 0) {
            record.userId = user.id;
            await transact.addNewTransaction(record);
          }
        });
        if (errors.length > 0) {
          console.log('errors', errors);
        }
      } // end of if condition
      getUserTransactions(user.id);
    }; // end of function

    if (csvData.length > 0) {
      checkCsvData();
    }
  }, [csvData, user.id]); // end of useEffect

  return (
    <div className='uploadWrapper'>
      <div
        className={'upload ' + (highlighted ? 'highlighted' : '')}
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
        Drag and drop .CSV file here
      </div>
      <>
        <p className='uploadText'>
          Valid CSV files contain only the following columns: Date, Category,
          Description, and Amount
        </p>
      </>
    </div>
  );
}

export default Upload;
