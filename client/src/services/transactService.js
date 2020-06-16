import axios from 'axios';

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
