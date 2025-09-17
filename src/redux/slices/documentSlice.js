import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {deleteADocument, revokeADocument, fetchDocuments, fetchAllAdminDocuments} from '../../utils/proofMintApi';

// Fetch all documents (if you already have it)
export const allFetchDocument = createAsyncThunk(
    'documents/fetchAll',
    async () => {
      const res = await fetchDocuments();
      return res;
    },
);

export const allFetchAdminDocuments = createAsyncThunk(
    'documents/fetchAdminDocuments',
    async () => {
      const res = await fetchAllAdminDocuments();
      return res.allDocs;
    },
);

// Delete document
export const removeDocument = createAsyncThunk(
    'documents/deleteDocument',
    async (docId) => {
      await deleteADocument({docId});
      return docId;
    },
);

// Revoke document
export const revokeDocument = createAsyncThunk(
    'documents/revokeDocument',
    async (docId) => {
      await revokeADocument({docId});
      return docId;
    },
);

const initialState = {
  documents: [],
  error: null,
};

const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearDocuments: (state, _)=>{
      state.documents=[];
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(allFetchDocument.fulfilled, (state, action) => {
          state.documents = action.payload;
          state.error = null;
        })
        .addCase(allFetchDocument.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch documents';
        })
        .addCase(allFetchAdminDocuments.fulfilled, (state, action) => {
          state.documents = action.payload;
          state.error = null;
        })
        .addCase(allFetchAdminDocuments.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to fetch documents';
        })
        .addCase(removeDocument.fulfilled, (state, action) => {
          state.documents = state.documents.filter(
              (doc) => doc.documentId !== action.payload,
          );
        })
        .addCase(removeDocument.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to delete document';
        })
        .addCase(revokeDocument.fulfilled, (state, action) => {
          const doc = state.documents.find(
              (d) => d.documentId === action.payload,
          );
          if (doc) doc.status = 'revoked';
        })
        .addCase(revokeDocument.rejected, (state, action) => {
          state.error = action.error.message || 'Failed to revoke document';
        });
  },
});
export const {clearDocuments}=documentSlice.actions;
export default documentSlice.reducer;
