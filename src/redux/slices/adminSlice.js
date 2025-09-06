import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchUser as fetchUserApi} from '../../utils/proofMintApi';

export const fetchUser = createAsyncThunk('documents/fetchDocuments', async () => {
  const data = await fetchUserApi();
  return data;
});

const initialState = {
  userData: [],
  error: null,
};

const adminSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(fetchUser.pending, (state) => {
          state.error = null;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.userData = action.payload;
          state.error = null;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch documents';
        });
  },
});


export default adminSlice.reducer;
