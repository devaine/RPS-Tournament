import React, { useState, useEffect, createContext, useContext } from "react";
import { socket } from "@/features/socketio/init";

// NOTE: This file is mostly used to update/indicate the current state 
// of the <Game/> page 

import type { GameScreen } from "@/types/gameAPI";

type GameContextType = {
	gameState: GameScreen | undefined;
	setGameState: (newGame: GameScreen) => void;
};

export const GameContext = createContext<GameContextType | undefined>(
	undefined,
);

/* NOTE: What this function does it actually fetch from backend
	* to know whether the game is still ongoing or whether it has already
	* ended
*/

// TODO: Find a way to universally redirect all clients to the End Screen
// Update: You could probably use this to create checks:
export function GameProvider({ children }: { children: React.ReactNode }) {
	const [gameState, setGameState] = useState<GameScreen>();

	if (gameState === "Ready") {
		socket.emit("playerReady")
	}

	// NOTE: This useEffect is usually activated for
	// when both players have pressed the "ready" button
	// and gameState changes to "Play"
	useEffect(() => {
		const updateGameState = (newState: GameScreen) => {
			setGameState(newState)
		}

		socket.on("updateGameState", updateGameState)
		return () => {
			socket.off("updateGameState", updateGameState)
		}
	}, [gameState])

	const handleSetGameState = (newGame: GameScreen) => {
		setGameState(newGame);
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
