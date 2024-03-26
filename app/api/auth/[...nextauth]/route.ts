import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { db } from "../../../../lib/db";

export const authOptions: AuthOptions = {
	providers: [
		// OAuth authentication providers...
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "john@gmail.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				// check user existence
				const profile = await db.user.findUnique({
					where: {
						email: credentials!.email,
					},
				});

				if (!profile) {
					throw new Error("No user found with given email");
				}

				// compare
				const isPasswordCorrect = await compare(
					credentials!.password,
					profile.password
				);

				// incorrect password
				if (!isPasswordCorrect || profile.email !== credentials!.email) {
					throw new Error("Email or passwords don't match");
				}

				return profile;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: { token: any; user: any }) {
			if (user) {
				// Add the additional user data to the JWT
				token.user = {
					id: user.id,
					email: user.email,
					username: user.username,
					image: user.image,
				};
			}
			return token;
		},
		async session({ session, token }: { session: any; token: JWT }) {
			session.user = token.user;
			return session;
		},
	},
	secret: "a9BH553Fy3wsOgUjsEqi9qmHxDbjRO7BwPTGnSowhDQ=",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
