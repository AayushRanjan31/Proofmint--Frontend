import config from '../config';
import axios from 'axios';

const baseUrl = config.api.baseUrl;

export async function signUp(username, email, password) {
  const response = await axios.post(`https://72adeeb5f1d1.ngrok-free.app/api/v1/auth/signup`, {username,email,password});
  console.log(response)
  return response.data;

};
export async function login(email, password) {
  const response = await axios.post(`https://72adeeb5f1d1.ngrok-free.app/api/v1/auth/login`,{email,password});
  console.log(response)
  return response.data;
};




















