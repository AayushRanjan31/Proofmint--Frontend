import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
};

const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {setTheme} = settingSlice.actions;
export default settingSlice.reducer;
