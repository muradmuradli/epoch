"use client";

import { Bookmark, Dot, Heart, MessageCircle, Reply } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { formatDate } from "../../../../utils/functions";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../../components/ui/avatar";
import { useSession } from "next-auth/react";

const SinglePost = ({ params }: { params: { slug: string } }) => {
	const [post, setPost] = useState<any>({});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { data: session } = useSession();

	const fetchPost = async () => {
		setIsLoading(true);
		const response = await axios.get(`/api/posts/${params.slug}`);
		setPost(response.data.data);
		setIsLoading(false);
	};

	const likePost = async () => {
		if (session?.user?.id) {
			// Update UI immediately
			setPost((prevPost: any) => ({
				...prevPost,
				likes: prevPost.likes.includes(session.user.id)
					? prevPost.likes.filter((id: string) => id !== session.user.id)
					: [...prevPost.likes, session.user.id],
			}));

			try {
				// Make API request
				await axios.post(`/api/posts/like/${params.slug}`, {
					userId: session.user.id,
				});
			} catch (error) {
				// Handle error, and revert UI state if necessary
				console.error("Failed to like post:", error);
				setPost((prevPost: any) => ({
					...prevPost,
					likes: prevPost.likes.filter((id: string) => id !== session.user.id),
				}));
			}
		}
	};

	useEffect(() => {
		fetchPost();
	}, []);

	if (isLoading) {
		return (
			<div className="w-full flex justify-center pt-10 h-screen">
				<MoonLoader />
			</div>
		);
	}

	return (
		<div className="flex gap-7 pt-2 mt-20">
			<div className="w-2/12 flex flex-col gap-4 items-end mt-10">
				<div className="flex flex-col gap-1 items-center">
					<button onClick={likePost}>
						<Heart
							color={post?.likes?.includes(session?.user?.id) ? "red" : "black"}
						/>
					</button>
					<span>{post?.likes?.length}</span>
				</div>
				<div className="flex flex-col gap-1 items-center">
					<a href="#comments">
						<MessageCircle />
					</a>
					<span>{post.comments?.length}</span>
				</div>
				<button>
					<Bookmark />
				</button>
			</div>
			<div className="bg-white w-6/12 min-h-screen rounded-md overflow-hidden">
				{/* background image */}
				<div className="h-80">
					<img
						className="h-full object-cover w-full"
						src={post?.image}
						alt="background"
					/>
				</div>

				<div className="py-6 px-16 flex flex-col gap-8">
					<div className="flex gap-3">
						<Avatar className="cursor-pointer">
							<AvatarImage src={post?.user?.image} />
							<AvatarFallback className="uppercase">
								{post?.user?.username?.slice(0, 2)}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<h1 className="font-extrabold">{post?.user?.username}</h1>
							<span className="text-sm text-slate-400">
								Posted on {formatDate(post.createdAt)}
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-1">
						<h1 className="text-6xl font-extrabold">{post.title}</h1>
						<div className="flex items-center gap-6 text-zinc-400">
							{post?.tags?.map((tag: string, index: number) => {
								return <span key={index}>#{tag}</span>;
							})}
						</div>
					</div>

					<div
						className="text-lg text-justify"
						style={{ wordWrap: "break-word" }}
						dangerouslySetInnerHTML={{ __html: post?.content }}
					/>

					<div>
						<div className="flex flex-col gap-7">
							<h1 className="text-2xl">Comments ({post?.comments?.length})</h1>
							<div className="flex gap-2">
								<Avatar className="cursor-pointer">
									<AvatarImage src={post?.user?.image} />
									<AvatarFallback className="uppercase">
										{post?.user?.username?.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<textarea
									className="w-full p-2 border border-slate-300 rounded-md"
									rows={3}
									placeholder="Add to the discussion"
								></textarea>
							</div>
						</div>

						<div id="comments" className="mt-8 flex flex-col gap-5">
							{post?.comments?.map((comment: any) => {
								return (
									<div key={comment.id} className="flex gap-2">
										<Avatar className="cursor-pointer">
											<AvatarImage src={comment?.user?.image} />
											<AvatarFallback className="uppercase">
												{comment?.user?.username?.slice(0, 2)}
											</AvatarFallback>
										</Avatar>

										<div className="flex flex-col gap-2 w-full">
											<div className="p-3 border border-slate-200 rounded-md">
												<div className="flex items-center gap-1">
													<h1 className="font-semibold">
														{comment?.user?.username}
													</h1>
													<Dot />
													<span className="text-sm text-slate-500">
														{formatDate(comment?.createdAt)}
													</span>
												</div>
												<span>{comment?.content}</span>
											</div>
											<div className="flex gap-7">
												<div className="flex items-center gap-2">
													<button>
														<Heart />
													</button>
													<span>{comment?.likes?.length}</span>
												</div>
												<div className="flex items-center gap-2">
													<button>
														<MessageCircle />
													</button>
													<span>23</span>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
			<div className="w-3/12 h-48 bg-white rounded-md overflow-hidden">
				<div className="bg-slate-200 w-full p-3 flex gap-2">
					<Avatar className="cursor-pointer">
						<AvatarImage src={post?.user?.image} />
						<AvatarFallback className="uppercase">
							{post?.user?.username?.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<h1 className="text-lg font-semibold">{post?.user?.username}</h1>
						<span className="text-sm">
							Joined: {formatDate(post?.user?.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SinglePost;
