import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  documentId: '',
  verified: false,
};

const verifyDocument = createSlice({
  name: 'verifyDocument',
  initialState,
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    setVerified: (state) => {
      if (state.documentId.trim() !== '') {
        state.verified = true;
      } else {
        state.verified = false;
      }
    },
  },
});

export const {setDocumentId, setVerified} = verifyDocument.actions;
export default verifyDocument.reducer;
