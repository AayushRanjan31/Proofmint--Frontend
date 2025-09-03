import {configureStore} from '@reduxjs/toolkit';
import verifyDocumentReducer from '../slices/verifyDocument';
import uploadDocumentReducer from '../slices/uploadDocument'

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    uploadDocument: uploadDocumentReducer,
  },
});
