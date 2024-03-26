import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/slice";
import postsReducer from "./posts/slice";

export const store = configureStore({
	reducer: {
		user: userReducer,
		posts: postsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
