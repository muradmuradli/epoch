import { db } from "../../../lib/db";

export async function GET() {
	const posts = await db.post.findMany();
	const userIds = posts.map((post) => post.createdBy);

	const users = await db.user.findMany({
		where: {
			id: {
				in: userIds,
			},
		},
	});

	// Now you can combine the posts and users as needed
	const postsWithUsers = posts.map((post) => ({
		...post,
		user: users.find((user) => user.id === post.createdBy),
	}));

	return Response.json({ data: postsWithUsers, status: 201 });
}

export async function POST(req: Request) {
	const {
		title,
		image,
		description,
		content,
		topic,
		tags,
		id: userId,
	} = await req.json();

	const post = await db.post.create({
		data: {
			title,
			tags,
			description,
			topic,
			content,
			image,
			createdBy: userId,
		},
	});

	return Response.json({ data: post, status: 201 });
}
