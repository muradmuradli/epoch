"use client";

import axios from "axios";
import Post from "./Post";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const PostList = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [posts, setPosts] = useState([]);

	const fetchPosts = async () => {
		setIsLoading(true);
		const postsWithUsers = await axios.get("/api/posts");
		setPosts(postsWithUsers.data.data);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	if (isLoading) {
		return (
			<div className="px-40 py-8">
				<ClipLoader className="ml-64" size={60} />
			</div>
		);
	}

	return (
		<div className="lg:px-40 lg:py-8 flex flex-col gap-9">
			{posts.map((post: any) => {
				return <Post key={post.id} {...post} />;
			})}
		</div>
	);
};

export default PostList;
