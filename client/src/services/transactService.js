import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

function setJwt() {
  // configuring default headers for all http requests
  const jwt = user.token;
  axios.defaults.headers.common['auth-token'] = jwt;
}

if (user) {
  setJwt();
}

export async function getTransactions() {
  return await axios.get('/api/transactions');
}

export async function getUserTransactions(userId) {
  return await axios.get(`/api/transactions/user/${userId}`);
}

export async function addNewTransaction(item) {
  return await axios.post('/api/transactions', item);
}

export async function deleteTransaction(id) {
  return await axios.delete(`/api/transactions/${id}`);
}

export async function editTransaction(id, data, headers) {
  return await axios.put(`/api/transactions/${id}`, data, headers);
}

export default {
  getTransactions,
  getUserTransactions,
  addNewTransaction,
  deleteTransaction,
  editTransaction,
};
