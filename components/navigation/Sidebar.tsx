"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Logo from "./Logo";

interface SidebarProps {
	openSidebar: boolean;
	setOpenSidebar: (value: boolean) => void;
}

const Sidebar = ({ openSidebar, setOpenSidebar }: SidebarProps) => {
	return (
		<AnimatePresence>
			{openSidebar && (
				<motion.div
					className="w-full lg:hidden p-7 h-screen absolute top-0 left-0 z-50 bg-zinc-200"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="flex items-center justify-between">
						<Logo />
						<button onClick={() => setOpenSidebar(false)}>
							<X size={30} />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Sidebar;
