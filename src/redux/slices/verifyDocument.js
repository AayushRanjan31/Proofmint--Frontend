import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCertificateDetails} from '../../utils/proofMintApi';

export const getCerificate = createAsyncThunk(
  'getCertificate',
  async (documentId) => {
    const certificateDetails = await getCertificateDetails(documentId);
    return certificateDetails; 
  }
);


const initialState = {
  documentId: '',
  verified: false,
  certificate: null,
};
const verifyDocument = createSlice({
  name: 'verifyDocument',
  initialState,
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
  },
 extraReducers: (builder) => {
  builder.addCase(getCerificate.fulfilled, (state, action) => {
    state.certificate = action.payload;
  });
}

});

export const {setDocumentId} = verifyDocument.actions;
export default verifyDocument.reducer;
