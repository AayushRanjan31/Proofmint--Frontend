import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchDocuments from '../../utils/proofMintApi'

export const allDocument = createAsyncThunk("documents/fetchDocuments", async () => {
    const data = fetchDocuments()
    return data;
})

const initialState = {
    documents: [],
    loading: false,
    error: null,
}

const documentSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
     builder
     .addCase(allDocument.pending, (state) => {
        state.loading = true
     })
     .addCase(allDocument.fulfilled, (state, action) => {
        state.documents = action.payload;
     })
     .addCase(allDocument.rejected, (state) => {
        state.error = action.error.message;
     })
    }
})

export default documentSlice.reducer;