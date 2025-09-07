import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName") || "",
  userEmail: localStorage.getItem("userEmail") || "",
  userId: localStorage.getItem("userId") || "",
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem("userName", action.payload); // ✅ persist
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
      localStorage.setItem("userEmail", action.payload); // ✅ persist
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload); // ✅ persist
    },
    clearUser: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.userId = "";
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
    },
  },
});

export const { setUserName, setUserEmail, setUserId, clearUser } =
  userDetails.actions;
export default userDetails.reducer;
