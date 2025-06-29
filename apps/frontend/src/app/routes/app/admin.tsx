import React from "react";
import { useState } from "react";
import { Title, Heading } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import Dashboard from "@/app/routes/app/dashboard";
import { MultiButtonLayout } from "@/components/layouts/multi-button-layout";
import { Input } from "@/components/ui/input";
import { Formik } from "formik";
import { AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import type { AdminScreen } from "@/types/gameAPI";
import { AdminLogin } from "@/features/auth/admin-login";

import { socket } from "@/features/socketio/init";
import Divider from "@/components/ui/divider";

// SocketIO Stuff

function startRound() {
	socket.emit("startRound");
}

// TODO: Update to movePlayer or something else (see game.ts)
function removePlayer() {
	socket.emit("removePlayer");
}

function startGame() {
	socket.emit("startGame")
}

function endGame() {
	socket.emit("endGame")
}

export const Admin = () => {
	const [currentScreen, setCurrentScreen] = useState<AdminScreen>("Login");
	return (
		<AnimatePresence mode="wait">
			{currentScreen === "Login" && (
				<AdminLogin onSubmit={() => setCurrentScreen("Admin")} />
			)}
			{currentScreen === "Admin" && <AdminScreen />}
		</AnimatePresence>
	);
};

const AdminScreen = () => {
	/* NOTE: Start not only starts the game but prevents new players from joining */

	return (
		<div className="flex flex-col items-between">
			<div className="text-center">
				<Title text="ROCK PAPER SCISSORS ADMIN" />
			</div>
			<div className="flex min-w-screen gap-8 p-4">
				<div className="flex flex-col basis-1/3 gap-4">
					<Title text="Management" />
					<Divider />
					<div className="flex flex-col gap-2">
						<Heading text="Round" />
						<MultiButtonLayout horizontal={true}>
							<Button text="Start Round" onClick={startRound} />
							<Button text="Remove Player" onClick={removePlayer} />
						</MultiButtonLayout>
						<Heading text="Game" />
						<MultiButtonLayout horizontal={true}>
							<Button text="Start" onClick={startGame} />
							<Button text="End" color="background" onClick={endGame} />
						</MultiButtonLayout>
						<Heading text="Contestants" />
						{removeContestant()}
					</div>
				</div>
				<div className="basis-full">
					<Dashboard />
				</div>
			</div>
		</div>
	);
};

const removeContestant = () => {
	const validationSchema = Yup.object().shape({
		name: Yup.string().required(),
	});

	return (
		<MultiButtonLayout horizontal={true}>
			<Formik
				initialValues={{ name: "" }}
				onSubmit={(values) => {
					console.log(values.name);
					socket.emit("removeContestant", values.name);
				}}
				validationSchema={validationSchema}
			>
				{({ values, handleChange, handleSubmit }) => (
					<form onSubmit={handleSubmit} className="flex gap-4 items-end">
						<Input
							id="name"
							type="text"
							label="Remove Contestant by First Name"
							onChange={handleChange}
							value={values.name}
							placeholder="Bogos"
							maxLength={30}
						/>
						<Button type="submit" text="Enter" />
					</form>
				)}
			</Formik>
		</MultiButtonLayout>
	);
};

export default Admin;
