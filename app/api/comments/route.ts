import { db } from "../../../lib/db";

export async function POST(req: Request) {
	const post = await db.comment.create({
		data: {
			postId: "61716c9dccb107001c0595f0",
			content: "sdfhkdsjfhkdsjfhksjdfkjdfkjfhkjsdf",
			createdBy: "65282bf27beeeab859d0e808",
		},
	});

	return Response.json({ data: post, status: 201 });
}
