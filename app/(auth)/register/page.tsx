"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import Layout from "../../../components/AuthLayout";
import { Button } from "../../../components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { PasswordInput } from "../../../components/ui/password-input";
import { register } from "../../../features/auth/actions";
import { useAppSelector } from "../../../features/hooks";

export default function Register() {
	const router = useRouter();
	const { isLoading } = useAppSelector((store) => store.user);

	const formSchema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		email: z.string().email({ message: "Invalid email address" }),
		password: z.string().min(2, {
			message: "Password must be at least 2 characters.",
		}),
	});

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const response = await register({
			username: values.username,
			email: values.email,
			password: values.password,
		});

		if (response.type === "success") {
			toast.success(response.message, {
				duration: 2000,
				style: {
					backgroundColor: "#1790ec",
					color: "white",
				},
			});
			router.push("/login");
		} else {
			toast.error(response.message, { duration: 2000 });
		}
	};

	return (
		<Layout>
			<section className="w-3/4 mx-auto flex flex-col gap-10">
				<div className="title">
					<h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
					<p className="w-3/4 mx-auto text-gray-400">
						Become a member of our community
					</p>
				</div>

				{/* form */}
				<Form {...form}>
					<form
						className="flex flex-col gap-5"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="email" placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<div className="flex items-center">
											<PasswordInput
												showIcon={<Eye />}
												hideIcon={<EyeOff />}
												placeholder="Password"
												{...field}
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* login buttons */}

						<Button
							disabled={isLoading}
							className="bg-blue-500 hover:bg-blue-600"
							type="submit"
						>
							Register
						</Button>
					</form>
				</Form>

				{/* bottom */}
				<p className="text-center text-gray-400 mb-2 ">
					Have an account?{" "}
					<Link href={"/login"}>
						<span className="text-blue-700">Sign In</span>
					</Link>
				</p>
			</section>
		</Layout>
	);
}
