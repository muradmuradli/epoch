import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	credentials: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload;
		},
		setUser(state, action) {
			state.credentials = action.payload;
		},
	},
});

export const { setIsLoading, setUser } = userSlice.actions;
export default userSlice.reducer;
