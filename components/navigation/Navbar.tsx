"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
	const [openSidebar, setOpenSidebar] = useState<boolean>(false);
	const { data: session } = useSession();

	return (
		<div className="flex fixed top-0 h-[70px] w-full  items-center justify-between p-7 lg:px-40 lg:py-3 bg-slate-100">
			<Logo />
			<div className="flex items-center gap-8">
				<Link
					className="border-b-2 border-slate-100 transition-all hover:border-blue-600"
					href={"/about"}
				>
					Our Story
				</Link>
				<Link
					className="border-b-2 border-slate-100 transition-all hover:border-blue-600"
					href={"/write"}
				>
					Write
				</Link>

				{session?.user?.email ? (
					<UserAvatar
						image={session?.user?.image}
						username={session?.user?.username}
					/>
				) : (
					<Link
						className="border-b-2 border-slate-100 transition-all hover:border-blue-600"
						href={"/login"}
					>
						Sign In
					</Link>
				)}
			</div>
			<button className="lg:hidden" onClick={() => setOpenSidebar(true)}>
				<Menu size={30} />
			</button>
			<Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
		</div>
	);
};

export default Navbar;
