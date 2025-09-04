import { createSlice } from "@reduxjs/toolkit";

const settings=createSlice({
    name:"settings",
    initialState:{
        theme:"light"
    },
    reducers:{
        setTheme:(state,action)=>{
            state.theme=action.payload
        }
    }
})
export const {setTheme}=settings.actions;
export default settings.reducer;