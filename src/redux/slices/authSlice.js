import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUp, login } from '../../utils/proofMintApi';
import { toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  'register',
  async ({ signUpFirstname, signUpLastname, signUpEmail, signUpPassword, number }) => {
    const signUpData = await signUp(
      signUpFirstname,
      signUpLastname,
      signUpEmail,
      signUpPassword,
      number
    );
    return signUpData;
  }
);

export const loginUser = createAsyncThunk(
  'login',
  async ({ loginEmail, loginPassword }) => {
    const loginData = await login(loginEmail, loginPassword);
    return loginData;
  }
);

const Authentication = createSlice({
  name: 'authentication',
  initialState: {
    signUpFirstname: '',
    signUpLastname: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpConfirmPassword: '',
    loginEmail: '',
    loginPassword: '',
    number: '',
    isAdmin: '',
    token: null,
    isLoggedIn: false,      
    isAuthChecked: false, 
  },
  reducers: {
    setFirstname: (state, action) => { state.signUpFirstname = action.payload; },
    setLastname: (state, action) => { state.signUpLastname = action.payload; },
    setEmail: (state, action) => { state.signUpEmail = action.payload; },
    setPassword: (state, action) => { state.signUpPassword = action.payload; },
    setConfirmPassword: (state, action) => { state.signUpConfirmPassword = action.payload; },
    setLoginEmail: (state, action) => { state.loginEmail = action.payload; },
    setLoginPassword: (state, action) => { state.loginPassword = action.payload; },
    setLoggedIn: (state, action) => { state.isLoggedIn = action.payload; },
    setNumber: (state, action) => { state.number = action.payload; },
    setIsAdmin: (state, action) => { state.isAdmin = action.payload; },

    // checkAuth reads from localStorage instead of cookie
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
      } else {
        state.isLoggedIn = false;
        state.token = null;
      }
      state.isAuthChecked = true;
    },

    // logout removes token from localStorage
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.isAdmin = '';
      state.isAuthChecked = true;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginEmail = '';
        state.loginPassword = '';
        state.isAdmin = action.payload?.userData.role === 'admin';
        state.isLoggedIn = true;
        state.token = action.payload?.token;
        localStorage.setItem('token', action.payload?.token); // store in localStorage
        state.isAuthChecked = true;

        toast.success('Login successful.', { toastId: 'login-success' });
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginEmail = '';
        state.loginPassword = '';
        state.isLoggedIn = false;
        state.isAuthChecked = true;
        toast.error('Failed to login, Please try again.', { toastId: 'login-error' });
      })
      .addCase(registerUser.fulfilled, () => {
        toast.success('Registration successful', { toastId: 'registration-success' });
      })
      .addCase(registerUser.rejected, (state) => {
        state.signUpFirstname = '';
        state.signUpLastname = '';
        state.signUpEmail = '';
        state.signUpPassword = '';
        state.signUpConfirmPassword = '';
        state.number = '';
        toast.error('Failed to signUp. Please try again!', { toastId: 'registration-error' });
      });
  },
});

export const {
  setNumber,
  setFirstname,
  setLastname,
  setEmail,
  setPassword,
  setConfirmPassword,
  setLoginEmail,
  checkAuth,
  setLoginPassword,
  setLoggedIn,
  setIsAdmin,
  logout,
} = Authentication.actions;

export default Authentication.reducer;
