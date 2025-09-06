import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {toast} from 'react-toastify';

export const verifyOtp = createAsyncThunk(
    'auth/verifyOtp',
    async (otp, {rejectWithValue}) => {
      try {
        const res = await axios.post(
            '',
            {otp},
            {headers: {'Content-Type': 'application/json'}},
        );
        return res.data;
      } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || 'Invalid OTP',
        );
      }
    },
);

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    loading: false,
    success: false,
    error: null,
    otpArray: Array(6).fill(''),
    activeIndex: 0,
  },
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.otpArray = Array(6).fill('');
      state.activeIndex = 0;
    },
    setOtpDigit: (state, action) => {
      const {index, value} = action.payload;
      state.otpArray[index] = value;
    },
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    setOtpArray: (state, action) => {
      state.otpArray = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(verifyOtp.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(verifyOtp.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(verifyOtp.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || 'Invalid OTP');
        });
  },
});

export const {resetOtpState, setOtpDigit, setActiveIndex, setOtpArray} =
  otpSlice.actions;
export default otpSlice.reducer;
