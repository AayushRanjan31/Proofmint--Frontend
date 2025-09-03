import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
  },
});
