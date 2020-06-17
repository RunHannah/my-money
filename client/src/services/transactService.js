import axios from 'axios';

function setJwt() {
  // configuring default headers for all http requests
  const jwt = localStorage.getItem('token');
  axios.defaults.headers.common['auth-token'] = jwt;
}

setJwt();

export async function getTransactions() {
  return await axios.get('/api/transactions');
}

export async function getUserTransactions(userId) {
  return await axios.get(`/api/transactions/user/${userId}`);
}

export default {
  getTransactions,
  getUserTransactions,
};
