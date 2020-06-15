import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../userContext';
import './addTransaction.css';
import axios from 'axios';

const AddTransaction = () => {
  const [transactionName, setTransactionName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newTransaction, setNewTransaction] = useState({});
  const { user } = useContext(UserContext);

  const categories = [
    'Select A Category',
    'Dining',
    'Food',
    'Gas',
    'Health',
    'Other Services',
    'Travel',
    'Utilities',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('clicked');
    let transactionObj = {
      transactionName: '',
      date: '',
      amount: null,
      category: '',
      userId: null,
    };

    if (user && transactionName && date && amount && category) {
      transactionObj.transactionName = transactionName;
      transactionObj.date = date;
      transactionObj.amount = amount;
      transactionObj.category = category;
      transactionObj.userId = user.id;

      // setNewTransaction(transactionObj);
      await axios.post('/api/transactions', transactionObj);
    }

    setTransactionName('');
    setDate('');
    setAmount('');
    setCategory('');
    setNewTransaction({});
  };

  useEffect(() => {
    console.log('useEffect');
    console.log('user', user);
  }, []);

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <label>Add a New Transaction:</label>
        <input
          type='text'
          name='transactionName'
          value={transactionName}
          placeholder='transaction'
          onChange={(e) => setTransactionName(e.target.value)}
          required
        />
        <input
          type='date'
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type='number'
          name='amount'
          value={amount}
          placeholder='amount'
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddTransaction;
