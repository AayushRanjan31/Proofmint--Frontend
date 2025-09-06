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
    expiryDate:'',
    title:''
  },
  reducers: {
    setExpiryDate:(state,action)=>{
        state.expiryDate=action.payload
    },
    setTitle:(state,action)=>{
        state.title=action.payload
    },
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadDocument.fulfilled, (state) => {
      state.file = null;
      state.expiryDate='';
      state.title='';
      toast.success('uploaded successfully.', {toastId: 'upload-success'});
    }).addCase(uploadDocument.rejected, (state)=>{
      state.file=null;
      state.expiryDate='';
      state.title='';
      toast.error('upload failed ,Please upload again!.', {toastId: 'upload-error'});
    })
    ;
  },
});

export const {setFilePath, setFile,setTitle,setExpiryDate} = uploadDocumentSlice.actions;
export default uploadDocumentSlice.reducer;
