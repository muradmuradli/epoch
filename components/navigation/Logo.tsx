import { Bird } from "lucide-react";
import Link from "next/link";

const Logo = () => {
	return (
		<Link href="/">
			<div className="flex items-center gap-1">
				<Bird size={45} />
				<div className="relative flex flex-col text-center">
					<h1 className="text-3xl font-bold">EPOCH</h1>
					<span className=" text-sm -mt-1 tracking-wide">Past and Beyond</span>
				</div>
			</div>
		</Link>
	);
};

export default Logo;
