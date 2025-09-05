import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDocuments} from '../../utils/proofMintApi';

export const allFetchDocument = createAsyncThunk('documents/fetchDocuments', async () => {
  const data = await fetchDocuments();

  return data;
});
const initialState = {
  documents: [],
  error: null,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(allFetchDocument.pending, (state) => {
          state.error = null;
        })
        .addCase(allFetchDocument.fulfilled, (state, action) => {
          state.documents = action.payload;
          state.error = null;
        })
        .addCase(allFetchDocument.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch documents';
        });
  },
});


export default documentSlice.reducer;
