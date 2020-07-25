import React, { useState, useContext, useEffect, useCallback } from 'react';
import { parse } from 'papaparse';
import { UserContext } from '../../contexts/userContext';
import transact from '../../services/transactService';
import './upload.css';

function Upload() {
  const [highlighted, setHighlighted] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [errorsList, setErrorsList] = useState([]);
  const { user } = useContext(UserContext);

  const checkCsvData = useCallback(() => {
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
              errors.push(`${key} is an invalid field`);
              break;
          } // end of switch case
          return record;
        }); // end of keys loop

        setErrorsList([...new Set(errors)]);
        if (errors.length === 0) {
          record.userId = user.id;
          await transact.addNewTransaction(record);
        }
        errors = [];
      });
    } // end of csv loop
  }, [csvData, user.id]); // end of function

  useEffect(() => {
    checkCsvData();
  }, [checkCsvData]);

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
      <div className='uploadText'>
        {errorsList.length === 0 ? (
          <p>
            Valid CSV files contain only the following columns: Date, Category,
            Description, and Amount
          </p>
        ) : (
          <ul>
            {errorsList.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Upload;
