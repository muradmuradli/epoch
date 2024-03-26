"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import "@uploadthing/react/styles.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/components/ui/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import { RedirectType, redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	fullName: z.string(),
	biography: z.string(),
	location: z.string(),
});

const Profile = () => {
	const [image, setImage] = useState<string>("");

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			fullName: "",
			biography: "",
		},
	});

	const { data: session, status } = useSession();

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast.success("User information updated successfully!");
	}

	if (status === "loading") {
		return <p>Loading...</p>;
	}

	if (status === "unauthenticated") {
		redirect("/", RedirectType.replace);
	}

	return (
		<div className="px-10 w-9/12 mx-auto mt-20 p-8 h-full flex shadow-md shadow-slate-300 border border-slate-200 rounded-md">
			<div className="flex gap-2 w-full">
				<div className="w-4/12 bg-blue-400 rounded-md p-5 flex flex-col items-center">
					<div className="h-52 w-52 rounded-full">
						<img
							className="h-full w-full rounded-full object-cover"
							src={image ? image : "/default-user.jpg"}
						/>
					</div>
					<div className="w-full flex flex-col mt-5">
						<h1 className="mb-2 text-center">Upload a profile image</h1>
						<UploadButton
							endpoint="imageUploader"
							onClientUploadComplete={(res: any) => {
								setImage(res[0].url);
							}}
							onUploadError={(error: Error) => {
								alert(`ERROR! ${error.message}`);
							}}
						/>
					</div>
				</div>
				<div className="w-8/12 pl-10">
					<div className="mb-3">
						<div className="flex items-center gap-2">
							<User />
							<h1 className="text-2xl">Account</h1>
						</div>
						<span className="text-sm text-gray-500">
							Manage your account settings
						</span>
					</div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-2/3 space-y-6"
						>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" {...field} />
										</FormControl>
										<FormDescription>
											This is your public display name.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
										<FormControl>
											<Input placeholder="Full Name" {...field} />
										</FormControl>
										<FormDescription>
											Please enter your full name
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="biography"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Biography</FormLabel>
										<FormControl>
											<Textarea placeholder="Biography" {...field} />
										</FormControl>
										<FormDescription>Tell us about yourself.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
