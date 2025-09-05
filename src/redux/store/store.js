import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';
import Authentication from '../slices/authSlice';
import uploadDocumentReducer from '../slices/uploadDocument';
import settings from '../slices/settingSlice';
import documentReducer from '../slices/documentSlice';
import userDetails from '../slices/userDetails';


export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: Authentication,
    uploadDocument: uploadDocumentReducer,
    settings: settings,
    documents: documentReducer,
    userDetails:userDetails


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
