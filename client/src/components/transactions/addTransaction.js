import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { DataContext } from '../../contexts/dataContext';
import transact from '../../services/transactService';
import axios from 'axios';
import './addTransaction.css';

const AddTransaction = () => {
  const [transactionName, setTransactionName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useContext(UserContext);
  const { setData } = useContext(DataContext);

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

      await axios.post('/api/transactions', transactionObj);
    }

    setTransactionName('');
    setDate('');
    setAmount('');
    setCategory('');

    getUserTransactions(user.id);
  };

  async function getUserTransactions(userId) {
    try {
      const res = await transact.getUserTransactions(userId);
      setData(res.data.data);
    } catch (err) {
      console.log('getUserTransactions', err);
    }
  }

  return (
    <div className='container addTransaction'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='formName'>Add a New Transaction</h1>
        <label>Transaction Name</label>
        <input
          type='text'
          name='transactionName'
          value={transactionName}
          placeholder='transaction'
          onChange={(e) => setTransactionName(e.target.value)}
          required
        />
        <label>Date</label>
        <input
          type='date'
          name='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Amount</label>
        <input
          type='number'
          name='amount'
          min='1'
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
