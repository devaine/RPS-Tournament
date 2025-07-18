import React from "react";
import { Navigate } from "react-router-dom";
import { userData } from "@/config/global";
import { useGameContext } from "@/hooks/game-context";
import { socket } from "../socketio/init";
import { GameScreen } from "@/types/gameAPI";

// TODO: Update, outdated values + needed conditionals.

type ProtectedRouteProps = {
	children: React.ReactNode;
};

export const GameProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { gameState, setGameState } = useGameContext();

	const userData_storage = JSON.parse(
		String(localStorage.getItem("student_info")),
	);

	const userNotExists = !userData_storage;
	if (userNotExists) {
		return <Navigate to="/" replace />;
	}

	const userIsLoser = localStorage.getItem("status") === "Loser";
	if (userIsLoser) {
		return <Navigate to="/dashboard" replace />;
	}

	// Get the game state and change it ONLY when the state is "End"
	socket.emit("getGameState", (callback: GameScreen) => {
		if (callback === "End") {
			setGameState(callback)
		}
	})

	// For the listener in game-context.tsx
	if (gameState === "End") {
		return <Navigate to="/end" replace />
	}

	return children;
};

/* If the user is logged in, redirect to the game page */

export const RegisterProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { gameState, setGameState } = useGameContext();
	const userData_storage = String(localStorage.getItem("student_info"));

	const userIsRegistered = userData_storage.match("avatar");
	if (userIsRegistered) {
		return <Navigate to="/game" replace />;
	}

	socket.emit("getGameState", (callback: GameScreen) => {
		if (callback === "End") {
			setGameState(callback)
		}
	})

	// For the listener in game-context.tsx
	if (gameState === "End") {
		return <Navigate to="/end" replace />
	}

	return children;
};
