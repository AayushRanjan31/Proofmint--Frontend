import { configureStore } from "@reduxjs/toolkit";
import verifyDocumentReducer from "../slices/verifyDocument";
import Authentication from "../slices/authSlice";
import uploadDocumentReducer from "../slices/uploadDocument";

export const store = configureStore({
  reducer: {
    verifyDocument: verifyDocumentReducer,
    auth: Authentication,
    uploadDocument: uploadDocumentReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
