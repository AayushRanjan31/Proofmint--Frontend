import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';
import Authentication from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: Authentication,
  },
});
