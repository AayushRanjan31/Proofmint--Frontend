import config from '../config';
import axios from 'axios';

const baseUrl = config.api.baseUrl;

// signup 
export async function signUp(username, email, password) {
  const response = await axios.post(`https://28866a8e20da.ngrok-free.app/api/v1/auth/signup`, {username,email,password},{
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
  });
  return response.data;
};

// login 
export async function login(email, password) {
  console.log(email,password)
  
  const response = await axios.post(
  "https://ac4087f1a82c.ngrok-free.app/api/v1/auth/login", { email, password },{withCredentials: true,headers: {
    "Content-Type": "application/json",
    },
  }
);
console.log(response.data);
return response.data
};

//upload certificate
// export const uploadDocumentApi = async (file) => {
//   const formData = new FormData();
//   formData.append("document", file); 
//   console.log(formData)
//   const response = await axios.post("https://28866a8e20da.ngrok-free.app/api/v1/document/upload", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     withCredentials:true
//   });
//   return response.data;
// };

export const uploadDocumentApi = async ({ file, title, expiry, username }) => {
  const formData = new FormData();
  formData.append("file", file);    
  formData.append("title", title);     
  formData.append("expiry", expiry);       
  formData.append("username", username);   

  console.log("FormData entries:");
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  const response = await axios.post(
    "https://ac4087f1a82c.ngrok-free.app/api/v1/document/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true, 
    }
  );

  return response.data;
};


//Get certificate from back 
export const getCertificateWithQrApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/certificate`);
  return response.data; 
};

// stamp certificate to backend
export const saveFinalCertificateApi = async (blob) => {
  const formData = new FormData();
  formData.append("finalCert", blob, "certificate_with_qr.png");

  const response = await axios.post(`${API_BASE_URL}/save-final`, formData, {
    headers: { "Content-Type": "multipart/form-data" },withCredentials:true
  });
  return response.data;
};

export async function fetchDocuments(){
  const response = await axios.get('');
  return response;
} 

// verify document
export async function getCertificateDetails(documentId) {
  const certificate=await axios.get('')
  return certificate
  
}
















