import { hash } from "bcryptjs";
import { db } from "../../../lib/db";

export async function POST(req: Request) {
	const { username, email, password } = await req.json();

	// check for duplicate users
	const checkExistingUser = await db.user.findUnique({
		where: {
			email: email,
		},
	});

	if (checkExistingUser) {
		return Response.json({ message: "User already exists", status: 400 });
	}

	const hashedPassword = await hash(password, 12);

	const user = await db.user.create({
		data: {
			username,
			email,
			password: hashedPassword,
		},
	});

	if (user) {
		return Response.json({ message: "User created", status: 201 });
	} else {
		return Response.json({ message: "Something went wrong...", status: 500 });
	}
}
