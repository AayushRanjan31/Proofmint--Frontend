
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, login } from '../../utils/proofMintApi';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk('register', async ({signUpUsername,signUpEmail,signUpPassword}) => {
  const signUpData = await signUp(signUpUsername,signUpEmail,signUpPassword);
  return signUpData;
});
export const loginUser = createAsyncThunk('login', async ({loginEmail,loginPassword }) => {
  const loginData = await login(loginEmail,loginPassword);
  return loginData;
});
const Authentication = createSlice({
  name: 'authentication',
  initialState: {
    signUpUsername: "",
    signUpEmail: "",
    signUpPassword: "",
    signUpConfirmPassword: "",
    loginEmail: "",
    loginPassword: ""
  },
  reducers: {
    setUsername: (state, action) => {
      state.signUpUsername = action.payload;
    },
    setEmail: (state, action) => {
      state.signUpEmail = action.payload;
    },
    setPassword: (state, action) => {
      state.signUpPassword = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.signUpConfirmPassword = action.payload;
    },
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.loginPassword = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginEmail = "";
      state.loginPassword = "";
      toast.success('Login successful.', { toastId: 'login-success' });
    })
      .addCase(loginUser.rejected, (state) => {
        state.loginEmail = "";
        state.loginPassword = "";
        toast.error('Failed to login,Please try again.', { toastId: 'login-error' });
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.signUpUsername = "";
        state.signUpEmail = "";
        state.signUpPassword = "";
        state.signUpConfirmPassword = "";
        toast.success('Registration successful', { toastId: 'registration-success' });
      })
      .addCase(registerUser.rejected, (state) => {
        state.signUpUsername = "";
        state.signUpEmail = "";
        state.signUpPassword = "";
        state.signUpConfirmPassword = "";
        toast.error('Failed to add Board.Please try again!', { toastId: 'registration-error' });
      });
  },
});
export const { setUsername, setEmail, setPassword, setConfirmPassword, setLoginEmail, setLoginPassword } = Authentication.actions;
export default Authentication.reducer;

