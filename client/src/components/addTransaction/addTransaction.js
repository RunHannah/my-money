import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/userContext';
import { DataContext } from '../../contexts/dataContext';
import { EditDataContext } from '../../contexts/editDataContext';
import transact from '../../services/transactService';
import cleanDate from '../../utils/cleanDate';
import './addTransaction.css';

const AddTransaction = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const { user } = useContext(UserContext);
  const { setData } = useContext(DataContext);
  const { edit, setEdit } = useContext(EditDataContext);

  const categories = [
    'Select A Category',
    'Food',
    'Entertainment',
    'Health',
    'Other',
    'Auto',
    'Travel',
    'Home',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTransaction = {
      description: '',
      date: '',
      amount: null,
      category: '',
      userId: null,
    };

    if (user && description && date && amount && category) {
      newTransaction.description = description;
      newTransaction.date = date;
      newTransaction.amount = amount;
      newTransaction.category = category;
      newTransaction.userId = user.id;
    }

    if (
      newTransaction.category === 'Select A Category' ||
      !newTransaction.category
    ) {
      alert('Please select a category');
      return;
    }

    setDescription('');
    setDate('');
    setAmount('');
    setCategory('');

    return submitRequest(newTransaction);
  };

  const submitRequest = async (newEntry) => {
    if (!edit) {
      await transact.addNewTransaction(newEntry);
    }

    if (edit) {
      const data = newEntry;
      const headers = {
        'Content-Type': 'application/json',
      };
      await transact.editTransaction(edit[0]._id, data, headers);
      setEdit(null);
    }

    return getUserTransactions(user.id);
  };

  async function getUserTransactions(userId) {
    try {
      const res = await transact.getUserTransactions(userId);
      setData(res.data.data);
    } catch (err) {
      console.log('getUserTransactions', err);
    }
  }

  useEffect(() => {
    if (edit) {
      const dateFormat = cleanDate(edit[0].date);

      setDescription(edit[0].description);
      setDate(dateFormat);
      setAmount(edit[0].amount);
      setCategory(edit[0].category);
    }
  }, [edit]);

  return (
    <div className='container addTransaction'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='formName'>
          {edit ? 'Edit Transaction' : 'Add New Transaction'}
        </h1>
        <label>Transaction Name</label>
        <input
          type='text'
          name='description'
          value={description || ''}
          placeholder='transaction'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Date (2020 calendar year)</label>
        <input
          className='dateInput'
          type='date'
          name='date'
          min='2020-01-01'
          max='2020-12-31'
          value={date || ''}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <label>Amount</label>
        <input
          type='number'
          name='amount'
          min='1'
          value={amount || ''}
          placeholder='amount'
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          className='addSelect'
          name='category'
          value={category || ''}
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
