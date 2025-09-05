import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {signUp, login} from '../../utils/proofMintApi';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';


export const registerUser = createAsyncThunk('register', async ({signUpFirstname, signUpLastname, signUpEmail, signUpPassword}) => {
  const signUpData = await signUp(signUpFirstname, signUpLastname, signUpEmail, signUpPassword);
  return signUpData;
});
export const loginUser = createAsyncThunk('login', async ({loginEmail, loginPassword}) => {
  const loginData = await login(loginEmail, loginPassword);
  return loginData;
});


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
    token: '',
    isLoggedIn: false,
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
    setToken: (state, action)=>{
      state.token=action.payload;
    },
    setLoggedIn: (state, action)=>{
      state.isLoggedIn=action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginEmail = '';
      state.loginPassword = '';
      toast.success('Login successful.', {toastId: 'login-success'});

      const token = Cookies.get('token');
      if (token) {
        state.token = token;
        state.isLoggedIn=!state.isLoggedIn;
      }
    })
        .addCase(loginUser.rejected, (state) => {
          state.loginEmail = '';
          state.loginPassword = '';
          state.isLoggedIn=!state.isLoggedIn; // dummy
          toast.error('Failed to login,Please try again.', {toastId: 'login-error'});
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.signUpFirstname='';
          state.signUpLastname='';
          state.signUpEmail = '';
          state.signUpPassword = '';
          state.signUpConfirmPassword = '';
          toast.success('Registration successful', {toastId: 'registration-success'});
          navigate('/login');
        })
        .addCase(registerUser.rejected, (state) => {
          state.signUpFirstname='';
          state.signUpLastname='';
          state.signUpEmail = '';
          state.signUpPassword = '';
          state.signUpConfirmPassword = '';
          toast.error('Failed to signUp.Please try again!', {toastId: 'registration-error'});
        });
  },
});
export const {setFirstname, setLastname, setEmail, setPassword, setConfirmPassword, setLoginEmail, setLoginPassword, setLoggedIn} = Authentication.actions;
export default Authentication.reducer;

