import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';
import Authentication from '../slices/authSlice';
import uploadDocumentReducer from '../slices/uploadDocument';
import settings from '../slices/settingSlice';
import documentReducer from '../slices/documentSlice';
import userDetails from '../slices/userDetails';
import forgotPassword from '../slices/forgetPasswordSlice';
import resetPassword from '../slices/resetPasswordSlice';
import otp from '../slices/otpSlice';
import admin from '../slices/adminSlice';

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: Authentication,
    uploadDocument: uploadDocumentReducer,
    settings: settings,
    documents: documentReducer,
    userDetails: userDetails,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    otp: otp,
    admin: admin
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
