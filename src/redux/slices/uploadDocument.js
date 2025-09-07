import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {uploadDocumentApi} from '../../utils/proofMintApi';
import {toast} from 'react-toastify';

export const uploadDocument = createAsyncThunk('uploadDocument/upload', async (file, {rejectWithValue}) => {
  try {
    const data = await uploadDocumentApi(file);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Upload failed');
  }
},
);
const uploadDocumentSlice = createSlice({
  name: 'uploadDocument',
  initialState: {
    file: null,
    filePath: null,
    documentUrl: '',
    qrUrl: '',
    documentId: '',
    expiryDate: '',
    title: '',
    loading: false,
    saveWithQr: false,
  },
  reducers: {
    setExpiryDate: (state, action)=>{
      state.expiryDate=action.payload;
    },
    setTitle: (state, action)=>{
      state.title=action.payload;
    },
    setExpiryDate: (state, action)=>{
      state.expiryDate=action.payload;
    },
    setTitle: (state, action)=>{
      state.title=action.payload;
    },
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setDocumentUrl: (state, action)=>{
      state.documentUrl=action.payload;
    },
    setQrUrl: (state, action)=>{
      state.qrUrl=action.payload;
    },
    setDocumentId: (state, action)=>{
      state.documentId=action.payload;
    },
    setExpiryDate: (state, action)=>{
      state.expiryDate=action.payload;
    },
    setTitle: (state, action)=>{
      state.title=action.payload;
    },
    setDocumentUrl: (state, action)=>{
      state.documentUrl=action.payload;
    },
    setQrUrl: (state, action)=>{
      state.qrUrl=action.payload;
    },
    setDocumentId: (state, action)=>{
      state.documentId=action.payload;
    },
    setExpiryDate: (state, action)=>{
      state.expiryDate=action.payload;
    },
    setTitle: (state, action)=>{
      state.title=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.
        addCase(uploadDocument.pending, (state) => {
          state.loading = true;
        }).
        addCase(uploadDocument.fulfilled, (state, action) => {
          state.file = '';
          state.title='';
          state.expiryDate='';
          state.title='';
          state.expiryDate='';
          toast.success('uploaded successfully.', {toastId: 'upload-success'});
          state.loading = false;
        }).addCase(uploadDocument.rejected, (state, action)=>{
          state.file='';
          state.title='';
          state.expiryDate='';
          state.title='';
          state.expiryDate='';
          toast.error('upload failed ,Please upload again!.', {toastId: 'upload-error'});
        });
  },
});

export const {setFilePath, setFile, setDocumentUrl, setQrUrl, setDocumentId, setTitle, setExpiryDate} = uploadDocumentSlice.actions;
export default uploadDocumentSlice.reducer;
