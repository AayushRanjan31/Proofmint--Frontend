import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser,deleteUser } from "../../utils/proofMintApi";

export const fetchAllUser = createAsyncThunk("admin/fetchUser", async () => {
  const data = await fetchUser();
  return data.users;
});
export const removeUser = createAsyncThunk("admin/deleteUser", async (userId) => {
  await deleteUser({ userId }); // call API
  return userId; // return id so we can update state
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
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.userData = state.userData.filter((u) => u.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete user";
      });
  },
});

export default adminSlice.reducer;
