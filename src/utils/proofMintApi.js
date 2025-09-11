import axiosInstance from '../config';

export async function signUp(firstName, lastName, email, password, number) {
  const response = await axiosInstance.post(`/api/v1/auth/signup`, {firstName, lastName, email, password, number});
  return response.data;
}

export async function login(email, password) {
  const response = await axiosInstance.post(`/api/v1/auth/login`, {email, password});
  return response.data;
}

export async function fetchDocuments() {
  const response = await axiosInstance.get(`/api/v1/documents`);
  return response.data;
}

export const uploadDocumentApi = async ({file, title, expiry, username}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('title', title);
  formData.append('expiry', expiry);
  formData.append('username', username);
  const response = await axiosInstance.post(
      `/api/v1/document/upload`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
  );
  return response.data;
};


export const saveFinalCertificateApi = async (blob, documentId) => {
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('certificateId', documentId);
  const response = await axiosInstance.post(`/api/v1/document/stamps`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    }});
  return response.data;
};

export async function getCertificateDetails(documentId) {
  const certificate=await axiosInstance.post(`/api/v1/documents/verify`, {documentId});
  return certificate.data;
}

export const logout = async () => {
  await axiosInstance.post(`/api/v1/auth/logout`);
};

export const fetchUser = async () => {
  const res = await axiosInstance.get(`/api/v1/admin/`);
  return res.data;
};

export const changePassword = async (password, newPassword, email) => {
  return axiosInstance.post(`/api/v1/auth/update/password`, {
    email,
    password,
    newPassword,
  });
};

export const forgetPassword = async (email) => {
  const res = await axiosInstance.post(
      `/api/v1/auth/forgot/password`,
      {email: email});
  return res.data;
};

export const otpVerification =async ({email, otp})=>{
  const res = await axiosInstance.post(
      `/api/v1/auth/verify/otp`,
      {email, otp});
  return res.data;
};

export const resettingPassword=async ({email, newPassword})=>{
  const res= await axiosInstance.post(
      `/api/v1/auth/change/password`,
      {email, newPassword});
  return res.data;
};

export const deleteUser=async ({userId})=>{
  const res=await axiosInstance.delete(`/api/v1/admin/${userId}`);
  return res.data;
};

export const deleteADocument = async ({docId}) => {
  const res = await axiosInstance.delete(`/api/v1/admin/delete/document`, {
    data: {certificateId: docId},
  });
  return res.data;
};

export const revokeADocument=async ({docId})=>{
  const res=await axiosInstance.put(`/api/v1/documents/revoke`, {certificateId: docId});
  return res.data;
};

export async function fetchAllAdminDocuments() {
  const response = await axiosInstance.get(`/api/v1/admin/all/documents`);
  return response.data;
}

export const sendSignupOtp = async (email) => {
  const response = await axiosInstance.post('/api/v1/auth/signup/otp', {email});
  return response.data;
};

export const verifySignupOtp = async (email, otp) => {
  const response = await axiosInstance.post('/api/v1/auth/signup/otp/verify', {email, otp});
  return response.data;
};
