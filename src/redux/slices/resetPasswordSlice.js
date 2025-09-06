import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `/${token}`,
        { password: newPassword },
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reset password"
      );
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("Password reset successfully!");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to reset password");
      });
  },
});

export const { resetState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
