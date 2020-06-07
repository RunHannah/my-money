import axios from 'axios';

export async function register(name, email, password) {
  return await axios.post('/api/user/register', {
    name: name,
    email: email,
    password: password,
  });
}

export default {
  register,
};
