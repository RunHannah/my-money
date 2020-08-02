import React, { useState, useContext, useEffect, useCallback } from 'react';
import { parse } from 'papaparse';
import { UserContext } from '../../contexts/userContext';
import { DataContext } from '../../contexts/dataContext';
import transact from '../../services/transactService';
import moment from 'moment';
import './upload.css';

function Upload() {
  const [highlighted, setHighlighted] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [errorsList, setErrorsList] = useState([]);
  const { user } = useContext(UserContext);
  const { setData } = useContext(DataContext);

  const checkCsvData = useCallback(async () => {
    async function getUpdatedUserData() {
      try {
        const res = await transact.getUserTransactions(user.id);
        setData(res.data.data);
      } catch (err) {
        console.log('getUserTransactions', err);
      }
    }

    let errors = [];
    let records = [];
    csvData.map((item) => {
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
                errors.push(`${val} is an invalid number`);
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
              const formats = [
                'MM/DD/YYYY',
                'M/DD/YYYY',
                'M/D/YYYY',
                'MM/D/YYYY',
                'MM/DD/YY',
                'M/DD/YY',
                'MM/D/YY',
                'M/D/YY',
              ];
              const val = item[key].trim();
              const status = moment(val, formats, true).isValid();
              status
                ? (record[`${key}`] = val)
                : errors.push(`${val} is an invalid date`);
            }
            break;
          default:
            errors.push(`${key} is an invalid field`);
            break;
        } // end of switch case
        return record;
      }); // end of keys loop

      setErrorsList([...new Set(errors)]);
      if (
        record.amount &&
        record.date &&
        record.category &&
        record.description &&
        errors.length === 0
      ) {
        record.userId = user.id;
        records.push(record);
        record = {};
      }
      return record;
    });
    if (errors.length === 0 && records.length > 0) {
      let count = records.length;
      records.forEach(async (record) => {
        await transact.addNewTransaction(record);
        count--;
        if (count === 0) {
          await getUpdatedUserData();
        }
      });
    }
  }, [csvData, user.id, setData]); // end of function

  useEffect(() => {
    if (csvData.length > 0) {
      checkCsvData();
    }
  }, [checkCsvData, csvData.length]);

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
          <>
            <p>
              Valid CSV files contain only the following columns: Date,
              Category, Description, and Amount.
            </p>
            <span>
              <b>
                NOT RESPONSIBLE FOR PERSONAL DATA UPLOADED TO DATABASE. DO NOT
                USE PERSONAL DATA.
              </b>
            </span>
          </>
        ) : (
          <>
            <p className='fileError'>Unable to upload file:</p>
            <ul>
              {errorsList.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Upload;
