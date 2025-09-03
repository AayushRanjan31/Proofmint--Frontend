import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filePath: null,
}

const uploadDocument = createSlice({
    name:'uploadDocument',
    initialState,
   reducers: {
    setFilePath: (state, action) => {
      state.filePath = action.payload;
    },
    }
})

export const { setFilePath, clearFilePath } = uploadDocument.actions;
export default uploadDocument.reducer;