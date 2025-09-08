import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {forgetPassword} from '../../utils/proofMintApi';

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, {rejectWithValue}) => {
      try {
        const res = await forgetPassword(email);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Server error');
      }
    },
);

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState: {
    loading: false,
    success: false,
    error: null,
    resetPasswordEmail: '',
  },
  reducers: {
    setResetPasswordEmail: (state, action)=>{
      state.resetPasswordEmail=action.payload;
    },
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
          toast.success('OTP sent to your mail please enter!', {toastId: 'OTP'});
        })
        .addCase(forgotPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  },
});

export const {setResetPasswordEmail}=forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
