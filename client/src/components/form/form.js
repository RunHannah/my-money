import React, { useState, useEffect } from 'react';
import './form.css';

const Form = () => {
  const [transactionName, setTransactionName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newTransaction, setNewTransaction] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('clicked');
    let transactionObj = {
      transactionName: '',
      date: '',
      amount: null,
      category: '',
    };

    if (transactionName && date && amount && category) {
      transactionObj.transactionName = transactionName;
      transactionObj.date = date;
      transactionObj.amount = amount;
      transactionObj.category = category;

      setNewTransaction(transactionObj);
    }

    setTransactionName('');
    setDate('');
    setAmount('');
    setCategory('');
    setNewTransaction({});
  };

  useEffect(() => {
    console.log('useEffect');
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

export default Form;
