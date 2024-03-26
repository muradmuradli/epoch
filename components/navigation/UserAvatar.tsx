"use client";

import { LogOut, Milestone, Settings, User } from "lucide-react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserAvatarProps {
	username: string;
	image?: string;
}

const UserAvatar = ({ username, image }: UserAvatarProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="cursor-pointer">
					<AvatarImage src={image} />
					<AvatarFallback className="uppercase">
						{username?.slice(0, 2)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User className="mr-2 h-4 w-4" />
						<Link href={"/profile"}>Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Milestone className="mr-2 h-4 w-4" />
						<span>My Posts</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<LogOut className="mr-2 h-4 w-4" />
						<span onClick={() => signOut()}>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAvatar;
