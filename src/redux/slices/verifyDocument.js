import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getCertificateDetails} from '../../utils/proofMintApi';

export const getCerificate = createAsyncThunk(
    'verifyDocument/getCerificate',
    async (documentId, {rejectWithValue}) => {
      try {
        const certificateDetails = await getCertificateDetails(documentId);
        if (!certificateDetails) {
          return rejectWithValue('Document not found');
        }
        return certificateDetails;
      } catch {
        return rejectWithValue('Document not found');
      }
    },
);

const initialState = {
  documentId: '',
  verified: false,
  certificate: null,
  error: null,
};

const verifyDocument = createSlice({
  name: 'verifyDocument',
  initialState,
  reducers: {
    setDocumentId: (state, action) => {
      state.documentId = action.payload;
    },
    clearCertificate: (state) => {
      state.certificate = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getCerificate.fulfilled, (state, action) => {
          state.certificate = action.payload;
          state.error = null;
        })
        .addCase(getCerificate.rejected, (state, action) => {
          state.certificate = null;
          state.error = action.payload || 'Document not found';
        });
  },
});

export const {setDocumentId, clearCertificate} = verifyDocument.actions;
export default verifyDocument.reducer;
