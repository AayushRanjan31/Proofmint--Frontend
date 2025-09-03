import {configureStore} from '@reduxjs/toolkit';
import Authentication from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: Authentication,
  },
});
