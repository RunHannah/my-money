import axios from 'axios';

export async function login(email, password) {
  return await axios.post('/api/user/login', {
    email: email,
    password: password,
  });
}

export default {
  login,
};
