import axios from 'axios';

export async function login(email, password) {
  const response = await axios.post('/api/user/login', {
    email,
    password,
  });

  localStorage.setItem('user', JSON.stringify(response.data));
}

export async function loginWithJwt(registeredUser) {
  localStorage.setItem('user', JSON.stringify(registeredUser));
}

export async function logout(user) {
  localStorage.removeItem('user');
  const response = await axios.post('/api/user/logout', user)
}

export function getCurrentUser() {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = { name: storedUser.name, id: storedUser.id };
    return currentUser;
  } catch (error) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
};
