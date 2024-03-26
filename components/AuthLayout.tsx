import React from "react";
import { Toaster } from "react-hot-toast";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div>
			<div className="flex h-screen bg-blue-400 p-2 md:p-0">
				<Toaster />

				<div className="m-auto bg-slate-50 min-h-[35rem] rounded-md w-full lg:w-3/5 grid lg:grid-cols-2 scale-[95%]">
					<div className="hidden md:block">
						<img src="/login-bg.webp" className="h-full w-full object-cover" />
					</div>
					<div className="right flex flex-col justify-evenly">
						<div className="text-center pb-5">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Layout;
