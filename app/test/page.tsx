"use client";

import axios from "axios";

const Test = () => {
	const doit = async () => {
		const post = await axios.get("/api/posts/652ed5ae55bf6bed4bf5f14f");
		console.log(post);
	};

	return (
		<div>
			<button onClick={() => doit()}>click</button>
		</div>
	);
};

export default Test;
