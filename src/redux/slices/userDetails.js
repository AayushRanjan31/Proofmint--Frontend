import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName:"",
  userEmail:"",
  userId:""
};

const userDetails = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setUserName:(state,action)=>{
        state.userName=action.payload;
    },
    setUserEmail:(state,action)=>{
        state.userEmail=action.payload
    },
    setUserId:(state,action)=>{
        state.userId=action.payload
    }
  },
  
});
export const {setUserName,setUserEmail,setUserId} =userDetails.actions;
export default userDetails.reducer;

