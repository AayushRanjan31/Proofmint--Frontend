import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadDocumentApi } from "../../utils/proofMintApi";
import { toast } from 'react-toastify';

export const uploadDocument = createAsyncThunk("uploadDocument/upload",async (file, { rejectWithValue }) => {
    try {
      const data = await uploadDocumentApi(file);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);
const uploadDocumentSlice = createSlice({
  name: "uploadDocument",
  initialState: {
    file: null,
    filePath: null,
  },
  reducers: {
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    setFile: (state, action) => {
      state.file = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadDocument.fulfilled,(state, action) => {
      state.file = "";
      toast.success('uploaded successfully.', { toastId: 'upload-success' });
      
    }).addCase(uploadDocument.rejected,(state,action)=>{
      state.file=""
      toast.error('upload failed ,Please upload again!.', { toastId: 'upload-error' });
    })
    ;
  },
});

export const { setFilePath, setFile} = uploadDocumentSlice.actions;
export default uploadDocumentSlice.reducer;
