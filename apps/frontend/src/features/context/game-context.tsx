import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file is mostly used as functions to provide a universal way to access landing state (whether it should be set to register or game started)

import type { GameScreen } from "@/types/gameAPI";

type GameContextType = {
	gameState: GameScreen | undefined;
	setGameState: (newGame: GameScreen) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

export function GameProvider({ children }: { children: React.ReactNode }) {
	const [gameState, setGameState] = useState<GameScreen>();

	useEffect(() => {
		socket.on("game_update", (newGame) => {
			setGameState(newGame);
		});

		// Get initial state from server
		socket.emit("get_initial_game");

		return () => {
			socket.off("game_update");
		};
	}, [gameState]);

	const handleSetGameState = (newGame: GameScreen) => {
		setGameState(newGame);
		// Notify server about the screen change
		socket.emit("decision_update", newGame);
	};

	return (
		<GameContext.Provider
			value={{ gameState: gameState, setGameState: handleSetGameState }}
		>
			{children}
		</GameContext.Provider>
	);
}

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (context === undefined) {
		throw new Error("useGameContext must be used within a GameProvider");
	}
	return context;
};
