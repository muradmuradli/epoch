import axios from "axios";
import { store } from "../store";
import { setIsLoading, setPosts } from "./slice";

export const createPost = async (request: {
	id: string | undefined;
	title: string;
	topic: string;
	content: string;
	description: string;
	tags: string[];
	image: string;
}) => {
	const { id, title, topic, content, description, tags, image } = request;
	try {
		store.dispatch(setIsLoading(true));

		await axios.post("/api/posts", {
			id,
			title,
			topic,
			content,
			description,
			tags,
			image,
		});

		store.dispatch(setIsLoading(false));
		return { type: "success", message: "Post created!" };
	} catch (error: any) {
		store.dispatch(setIsLoading(false));
		return { type: "error", message: error.response.data.message };
	}
};
