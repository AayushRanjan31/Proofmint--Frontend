import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocumentSlice';
import authenticationReducer from '../slices/authSlice';
import uploadDocumentReducer from '../slices/uploadDocumentSlice';
import settingsReducer from '../slices/settingSlice';
import documentReducer from '../slices/documentSlice';
import forgotPasswordReducer from '../slices/forgotPasswordSlice';
import resetPasswordReducer from '../slices/resetPasswordSlice';
import otpReducer from '../slices/otpSlice';
import adminReducer from '../slices/adminSlice';

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: authenticationReducer,
    uploadDocument: uploadDocumentReducer,
    settings: settingsReducer,
    documents: documentReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    otp: otpReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
