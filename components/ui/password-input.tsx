"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface PasswordInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	showIcon: React.ReactNode;
	hideIcon: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className, showIcon, hideIcon, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = React.useState<boolean>(false);

		return (
			<div className="flex items-center relative w-full">
				<input
					type={`${showPassword ? "text" : "password"}`}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>
				<button
					className="absolute top-2 right-2"
					onClick={(e: any) => {
						e.preventDefault();
						setShowPassword(!showPassword);
					}}
				>
					{showPassword ? showIcon : hideIcon}
				</button>
			</div>
		);
	}
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
