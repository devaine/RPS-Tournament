import React from "react";
import { Button } from "@/components/ui/button";
import { RegisterLayout } from "@/components/layouts/register-layout";
import type { User } from "@/types/gameAPI";
import { Input } from "@/components/ui/input";
import { Formik } from "formik";
import * as Yup from "yup";

type LoginProps = {
	onSubmit: () => void;
};

// Admin password is the first 7 digits of the Fibonacci sequence
//const adminCred: User = {
//  name: "Admin Gang",
//  id: 11235813,
//  avatar: "",
//};

// NOTE: For testing
const adminCred: User = {
	name: "test",
	id: 123,
	avatar: "",
};

const validationSchema = Yup.object().shape({
	name: Yup.string().required(),
	id: Yup.number().required(),
});

export const AdminLogin = ({ onSubmit }: LoginProps) => {
	return (
		<RegisterLayout>
			<Formik
				initialValues={{ name: "", id: "" }}
				onSubmit={(values) => {
					if (
						values.name === adminCred.name &&
						values.id === String(adminCred.id)
					) {
						onSubmit();
						localStorage.setItem("status", "Admin");
					}
				}}
				validationSchema={validationSchema}
			>
				{({
					values,
					handleChange,
					handleSubmit,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit} className="flex flex-col gap-4">
						<Input
							id="name"
							type="text"
							label="Admin Username"
							onChange={handleChange}
							value={values.name}
							placeholder={""}
							maxLength={30}
						/>
						<Input
							id="id"
							type="password"
							inputMode="numeric" // Added for best compatibility
							label="Admin Password"
							onChange={handleChange}
							value={values.id}
							placeholder={""}
							maxLength={8}
						/>
						<div className="p-4">
							<Button type="submit" text="Submit"></Button>
						</div>
					</form>
				)}
			</Formik>
		</RegisterLayout>
	);
};
