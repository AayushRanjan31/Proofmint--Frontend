import config from '../config';
import axios from 'axios';

const baseUrl = config.api.baseUrl;

export async function signUp(username, email, password) {
  const response = await axios.post(`${baseUrl}`, {username,email,password});
  return response.data;
};
export async function login(email, password) {
  console.log(email,password)
  const response = await axios.post(`https://28866a8e20da.ngrok-free.app/api/v1/auth/login`,{email,password});

  return response.data;
};

export async function fetchDocuments(){
  const response = await axios.get('');
  return response;
} 
















