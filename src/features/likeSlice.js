
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalLikes:{}, // total likes {articleid: likes} of current post
    likedBlogs:null //hold data of current post's like collection
}

const likeSlice = createSlice({
    name:'likes',
    initialState: initialState,
    reducers:{
        incrementLike:(state,action) => {
            const {articleid} = action.payload;
            state.totalLikes[articleid] += 1;
        },  
        decrementLike:(state,action) => {
            const {articleid} = action.payload;
            state.totalLikes[articleid] -= 1;
        }, 
        setTotalLikes:(state,action) => {
            const {articleid,likes} = action.payload;
            state.totalLikes[articleid]=likes;
        },
        setLikedBlogs: (state,action) => {
            state.likedBlogs = action.payload.documents;
        } 
    }
})

export const { incrementLike,decrementLike,setTotalLikes,setLikedBlogs } = likeSlice.actions;
export default likeSlice.reducer;