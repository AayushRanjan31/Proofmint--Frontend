import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "",
        { email },  
        { headers: { "Content-Type": "application/json" } }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send reset link"
      );
    }
  }
);

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    success: false,
    error: null,
    resetPasswordEmail:"",
  },
  reducers: {
    setResetPasswordEmail:(state,action)=>{
        state.resetPasswordEmail=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        toast.success("Password reset link sent to your email!");
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to send reset link");
      });
  },
});

export const {setResetPasswordEmail}=forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer;
