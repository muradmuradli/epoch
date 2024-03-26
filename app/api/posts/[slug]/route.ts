import { db } from "../../../../lib/db";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	const postId = params.slug;

	const post = await db.post.findFirst({
		where: { id: postId },
		include: {
			comments: {},
		},
	});

	if (!post) {
		return Response.json({ error: "Post not found", status: 404 });
	}

	// Fetch the user associated with the createdBy field
	const createdByUser = await db.user.findFirst({
		where: { id: post.createdBy },
	});

	// Attach the user information to the post
	const postWithUser = { ...post, user: createdByUser };

	// Replace createdBy in comments with the user object
	const commentsWithUser = postWithUser.comments.map((comment) => {
		const { createdBy, ...commentWithoutCreatedBy } = comment;
		return {
			...commentWithoutCreatedBy,
			user: createdByUser,
		};
	});

	const postWithCommentsAndUser = {
		...postWithUser,
		comments: commentsWithUser,
	};

	return Response.json({ data: postWithCommentsAndUser, status: 201 });
}
