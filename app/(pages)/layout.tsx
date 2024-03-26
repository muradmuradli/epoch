import React from "react";
import Navbar from "../../components/navigation/Navbar";
import { Toaster } from "react-hot-toast";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Toaster />
			<Navbar />
			<div>{children}</div>
		</div>
	);
};

export default GeneralLayout;
