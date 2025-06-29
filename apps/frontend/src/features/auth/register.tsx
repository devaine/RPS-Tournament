import React from "react";
import { ErrorText } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import type { User } from "@/types/gameAPI";

// Backend Imports
import { userData } from "@/config/global"; // Global Variables
const RegisterScreen = () => {
	const formPlaceHolder: User = {
		name: "Bogos Binted",
		id: 1234567,
		avatar: "",
	};
	const navigate = useNavigate();

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.matches(/^[a-z ,.'-]+$/i)
			.required(), // Regex for Names (Only Letters)
		id: Yup.string().matches(/^\d*$/, "Only Numbers").length(7).required(), // Regex for ID's (Only Numbers)
	});
	return (
		<Formik
			initialValues={{ name: "", id: "" }}
			onSubmit={(values) => {
				// Get Student ID + Name from Formik
				userData.name = values.name;
				userData.id = Number(values.id);

				// Send Information to localStorage
				localStorage.setItem("student_info", JSON.stringify(userData));

				console.log(
					"student information: \n" + localStorage.getItem("student_info"),
				);

				navigate("/register");
			}}
			validationSchema={validationSchema}
		>
			{({
				values,
				handleChange,
				handleSubmit,
				errors,
				touched,
				/* and other goodies */
			}) => (
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Input
						id="name"
						type="text"
						label="First and Last Name"
						onChange={handleChange}
						value={values.name}
						placeholder={formPlaceHolder.name}
						maxLength={30}
					/>
					{
						// No numbers in name
						/\d/.test(values.name) ? (
							<ErrorText text="ERROR: Nice try, no numbers!" />
						) : null
					}
					{
						// If empty, send error
						errors.name && touched.name ? (
							<ErrorText text="ERROR: Fill out your name!" />
						) : null
					}
					<Input
						id="id"
						type="text"
						inputMode="numeric" // Added for best compatibility
						label="Student ID"
						onChange={handleChange}
						value={values.id}
						placeholder={String(formPlaceHolder.id)}
						maxLength={7}
					/>
					{
						// If empty on submission, send error to fill out ID
						errors.id && touched.id ? (
							<ErrorText text="ERROR: Fill out your Student ID!" />
						) : null
					}
					{
						// If values.id is NOT a number on submission, send error to correct
						errors.id && !/^\d*$/.test(values.id) && touched.id ? (
							<ErrorText text="ERROR: Not a valid Student ID!" />
						) : null
					}
					{
						// No letters in id
						/.*[a-zA-Z].*/.test(values.id) ? (
							<ErrorText text="ERROR: Nice try, no letters!" />
						) : null
					}
					{
						// No Symbols in id
						/[-!$%^&*()_+|~=`{}[]:";'<>?,.\/]/.test(values.id) ? (
							<ErrorText text="ERROR: Nice try, no symbols!" />
						) : null
					}
					{
						// No whitespace in id
						/\s{1,}/.test(values.id) ? (
							<ErrorText text="ERROR: Nice try, no spaces!" />
						) : null
					}
					<div className="p-4">
						<Button type="submit" text="Submit" link="/register"></Button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default RegisterScreen;
