import config from '../config';
import axios from 'axios';

const baseUrl = config.api.baseUrl;

// signup
export async function signUp(firstName, lastName, email, password, number) {
  const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, {firstName, lastName, email, password, number}, {
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  });
  return response.data;
};

// login
export async function login(email, password) {
  console.log(email, password);

  const response = await axios.post(
      `${baseUrl}/api/v1/auth/login`, {email, password}, {withCredentials: true, headers: {
        'Content-Type': 'application/json',
      },
      },
  );
  console.log(response.data);
  return response.data;
};

// get all documents
export async function fetchDocuments() {
  const res = await axios.get(`${baseUrl}/api/v1/documents`);
  return res.data;
}

// upload document
export const uploadDocumentApi = async ({file, title, expiry, username}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('expiry', expiry);
  formData.append('username', username);

  const response = await axios.post(
      `${baseUrl}/api/v1/document/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      },
  );

  return response.data;
};

// stamp document to backend
export const saveFinalCertificateApi = async (blob, documentId) => {
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('certificateId', documentId);
  const response = await axios.post(`${baseUrl}/api/v1/document/stamps`, formData, {
    headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true,
  });
  return response.data;
};

// // verify document
export async function getCertificateDetails(documentId) {
  const certificate=await axios.get(`${baseUrl}/api/v1/documents/${documentId}`);
  return certificate.data;
}

export const logout = async () => {
  await axios.post(`${baseUrl}/api/v1/auth/logout`);
};


export const fetchUser = async () => {
  const res = await axios.get(`${baseUrl}/api/v1/admin/`);
  return res;
};

export const changePassword = async (password, newPassword, email) => {
  return axios.post(`${baseUrl}/api/v1/auth/update/password`, {
    email,
    password,
    newPassword,
  }, {withCredentials: true});
};

