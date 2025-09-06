import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../../utils/proofMintApi";

export const fetchAllUser = createAsyncThunk("admin/fetchUser", async () => {
  const data = await fetchUser();
  return data;
});

const initialState = {
  userData: [],
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export default adminSlice.reducer;
