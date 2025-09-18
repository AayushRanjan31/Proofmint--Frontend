import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {signUp, login} from '../../utils/proofMintApi';
import {toast} from 'react-toastify';

export const registerUser = createAsyncThunk(
    'register',
    async ({signUpFirstname, signUpLastname, signUpEmail, signUpPassword, number}) => {
      const signUpData = await signUp(
          signUpFirstname,
          signUpLastname,
          signUpEmail,
          signUpPassword,
          number,
      );
      return signUpData;
    },
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({loginEmail, loginPassword}, {rejectWithValue}) => {
      try {
        const loginData = await login(loginEmail, loginPassword, {withCredentials: true});
        return loginData;
      } catch (err) {
        const message = err.response?.data?.message || 'Something went wrong';
        return rejectWithValue(message);
      }
    },
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
    token: localStorage.getItem('token') || null,
    isLoggedIn: !!localStorage.getItem('token'),
    isAuthChecked: false,
  },
  reducers: {
    setFirstname: (state, action) => {
      state.signUpFirstname = action.payload;
    },
    setLastname: (state, action) => {
      state.signUpLastname = action.payload;
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
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setNumber: (state, action) => {
      state.number = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    checkAuth: (state) => {
      const token = localStorage.getItem('token');
      // restore boolean
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
        state.isAdmin = isAdmin;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.isAdmin = false;
      }
    },

  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loginEmail = '';
          state.loginPassword = '';
          state.isAdmin = action.payload?.userData?.role === 'admin';
          localStorage.setItem('isAdmin', state.isAdmin);
          state.isLoggedIn = true;

          const token = action.payload?.userData.email;
          if (token) {
            state.token = token;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', action.payload.userData.email);
            localStorage.setItem('userName', action.payload.userData.firstName);
          }
          toast.success('Login successful.', {toastId: 'login-success'});
        })
        .addCase(loginUser.rejected, (state) => {
          state.loginEmail = '';
          state.loginPassword = '';
          state.isLoggedIn = false;
        })
        .addCase(registerUser.fulfilled, (state) => {
          toast.success('Registration successful', {toastId: 'registration-success'});
        })
        .addCase(registerUser.rejected, (state) => {
          state.signUpFirstname = '';
          state.signUpLastname = '';
          state.signUpEmail = '';
          state.signUpPassword = '';
          state.signUpConfirmPassword = '';
          state.number = '';
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
  setLoginPassword,
  setLoggedIn,
  setIsAdmin,
  logout,
  checkAuth,
} = Authentication.actions;

export default Authentication.reducer;
