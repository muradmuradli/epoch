import axios from "axios";
import { signIn } from "next-auth/react";
import { store } from "../store";
import { setIsLoading, setUser } from "./slice";

export const register = async (request: {
	username: string;
	email: string;
	password: string;
}) => {
	try {
		store.dispatch(setIsLoading(true));
		await axios.post("/api/register", request);
		store.dispatch(setIsLoading(false));
		return { type: "success", message: "Registration successfull!" };
	} catch (error: any) {
		store.dispatch(setIsLoading(false));
		return { type: "error", message: error.response.data.message };
	}
};

export const login = async (request: { email: string; password: string }) => {
	store.dispatch(setIsLoading(true));
	const status: any = await signIn("credentials", {
		redirect: false,
		email: request.email,
		password: request.password,
		callbackUrl: "/",
	});
	store.dispatch(setIsLoading(false));

	if (status.ok) {
		return {
			type: "success",
			message: "Signed in successfully! Redirecting...",
		};
	} else {
		return {
			type: "error",
			message: status.error,
		};
	}
};

export const getCurrentUser = async (request: { email: string }) => {
	store.dispatch(setIsLoading(true));

	const { data } = await axios.post("/api/auth/getCurrentUser", {
		email: `${request.email}`,
	});

	store.dispatch(setUser(data.user));
	store.dispatch(setIsLoading(false));
};
