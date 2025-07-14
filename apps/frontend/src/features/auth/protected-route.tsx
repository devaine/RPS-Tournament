import React from "react";
import { Navigate } from "react-router-dom";
import { userData } from "@/config/global";

// TODO: Update, outdated values + needed conditionals.

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const GameProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const userData_storage = JSON.parse(
		String(localStorage.getItem("student_info")),
	);

	const userNotExists = !userData_storage;
	if (userNotExists) {
		return <Navigate to="/" replace />;
	}

	const userIsLoser = localStorage.getItem("status") === "Loser";
	if (userIsLoser) {
		console.log(userData.status);
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};

/* If the user is logged in, redirect to the game page */

export const RegisterProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const userData_storage = String(localStorage.getItem("student_info"));

	const userIsRegistered = userData_storage.match("avatar");
	if (userIsRegistered) {
		return <Navigate to="/game" replace />;
	}

	return children;
};
