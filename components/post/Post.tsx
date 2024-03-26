import { format } from "date-fns";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../../components/ui/tooltip";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar";
import Link from "next/link";
import { estimateReadingTime, formatDate } from "../../utils/functions";

interface PostProps {
	id: number;
	title: string;
	description: string;
	createdAt: string;
	category: string;
	content: string;
	image: string;
	user: { image: string; username: string };
}

const Post = ({
	id,
	title,
	description,
	createdAt,
	content,
	topic,
	image,
	user,
}: PostProps) => {
	return (
		<div className="flex justify-between gap-2 w-[40rem]">
			<div className="flex flex-col gap-3 w-8/12">
				<div className="flex items-center gap-2">
					<Avatar className="h-8 w-8">
						<AvatarImage src={user.image} />
						<AvatarFallback className="uppercase text-xs">
							{user.username.slice(0, 2)}
						</AvatarFallback>
					</Avatar>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<h1 className="text-sm">{user.username}</h1>
							</TooltipTrigger>
							<TooltipContent>
								<div>
									<h1>{user.username}</h1>
								</div>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				<Link href={`/posts/${id}`}>
					<div className="flex flex-col">
						<h1 className="text-2xl font-semibold">{title}</h1>
						<h2>{description}</h2>
						<div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
							<span>{formatDate(createdAt)}</span>
							<span>{estimateReadingTime(content)} minute read</span>
							<span className="bg-zinc-200 px-3 py-1 rounded-full capitalize">
								{topic}
							</span>
						</div>
					</div>
				</Link>
			</div>
			<div className="w-4/12 bg-blue-200">
				<img className="rounded-md" src={image} alt="image" />
			</div>
		</div>
	);
};

export default Post;
