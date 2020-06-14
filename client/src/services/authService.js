import axios from 'axios';
import jwtDecode from 'jwt-decode';

const tokenKey = 'token';

export async function login(email, password) {
  const response = await axios.post('/api/user/login', {
    email: email,
    password: password,
  });

  localStorage.setItem(tokenKey, response.data.token);
}

export async function loginWithJwt(registeredUser) {
  localStorage.setItem(tokenKey, registeredUser.headers['auth-token']);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
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
