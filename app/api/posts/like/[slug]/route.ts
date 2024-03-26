import { db } from "../../../../../lib/db";

export async function POST(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	const postId = params.slug;
	const { userId } = await request.json();

	// Check if the user ID already exists in the likes array
	const post = await db.post.findFirst({
		where: { id: postId },
	});

	if (!post) {
		return Response.json({ error: "Post not found", status: 404 });
	}

	const userLiked = post.likes.includes(userId);

	// Update the post with the user's ID added or removed from the likes array
	await db.post.updateMany({
		where: { id: postId },
		data: {
			likes: {
				// Conditionally add or remove the user's ID from the likes array
				set: userLiked
					? post.likes.filter((id) => id !== userId)
					: [...post.likes, userId],
			},
		},
	});

	return Response.json({ status: 201 });
}
