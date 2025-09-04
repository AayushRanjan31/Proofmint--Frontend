import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';
import Authentication from '../slices/authSlice'
import uploadDocumentReducer from '../slices/uploadDocument'
import settings from "../slices/settingSlice"
export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: Authentication,
    uploadDocument: uploadDocumentReducer,
    Settings:settings,
  },
});
