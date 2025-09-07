import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {resettingPassword} from '../../utils/proofMintApi';

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({email, newPassword}, {rejectWithValue}) => {
      try {
        const res=resettingPassword({email, newPassword});
        return res.data;
      } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Failed to reset password',
        );
      }
    },
);

const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState: {
    loading: false,
    success: false,
    newPassword: '',
    confirmPassword: '',
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setNewPassword: (state, action)=>{
      state.newPassword=action.payload;
    },
    setConfirmPassword: (state, action)=>{
      state.confirmPassword=action.payload;
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
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error('Failed to reset password', {toastId: 'reset'});
        });
  },
});

export const {resetState, setConfirmPassword, setNewPassword} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
