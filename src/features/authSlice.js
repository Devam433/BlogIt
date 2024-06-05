
//this is a slice to track whether the user is autheticated or not. Will check the store to know whether the user is logged in or not

import { createSlice } from "@reduxjs/toolkit";

const initialState={   //initial state
    status:false,
    userData:null,
    userAvatarUrl:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        login: (state,action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        setAvatar: (state,action) => {
            state.userAvatarUrl = action.payload;
        }
    }
})

export const {login,logout,setAvatar} = authSlice.actions;  //exporting actons

export default authSlice.reducer;  // exporting reducers