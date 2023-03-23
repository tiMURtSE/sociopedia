import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = (state.mode === 'light') ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.log('user friends non-existent');
            }
        },
        setPost: (state, action) => {
            const newPost = action.payload.post;
            const updatedPosts = state.posts.map(post => {
                if (post._id === newPost._id) return newPost;

                return post;
            });

            state.posts = updatedPosts;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        }
    }
});

export default authSlice.reducer;
export const { 
    setMode,
    setLogin,
    setLogout,
    setFriends,
    setPosts,
    setPost 
} = authSlice.actions;