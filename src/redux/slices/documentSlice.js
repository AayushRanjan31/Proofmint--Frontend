import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchDocuments} from '../../utils/proofMintApi';

export const allFetchDocument = createAsyncThunk('documents/fetchDocuments', async () => {
  const data = await fetchDocuments();
  return data;
});

const initialState = {
  documents: [],
  // loading: false,
  // error: null,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(allFetchDocument.pending, (state) => {
          state.loading = true;
        })
        .addCase(allFetchDocument.fulfilled, (state, action) => {
          state.documents = action.payload;
        })
        .addCase(allFetchDocument.rejected, (state) => {
          state.error = action.error.message;
        });
  },
});

export default documentSlice.reducer;
