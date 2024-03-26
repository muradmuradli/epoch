import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	posts: [],
};

const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setPosts(state, action) {
			state.posts = action.payload;
		},
	},
});

export const { setIsLoading, setPosts } = postSlice.actions;
export default postSlice.reducer;
