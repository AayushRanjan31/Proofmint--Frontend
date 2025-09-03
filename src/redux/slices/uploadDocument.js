import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filePath: null,
}

const fileSlice = createSlice({
    name:'uploadDocument',
    initialState,
    reducers: {
        set
    }
})