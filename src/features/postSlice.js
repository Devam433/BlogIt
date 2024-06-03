import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    isLoading: true,
    error: null,
}

const postSlice = createSlice({
    name:'posts',
    initialState: initialState,
    reducers:{
        addPosts: (state, action)=>{
            state.allPosts = action.payload;
        },
        setLoading: (state, action) =>{
            state.isLoading = action.payload;
        },
        setError: (state, action)=>{
            state.error = action.payload;
        }
    }
}
)

export const {addPosts,setLoading,setError} = postSlice.actions; 
export default postSlice.reducer;